import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Parsed body middleware
app.use(express.json());

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== "MY_GEMINI_API_KEY" && API_KEY.trim() !== "") {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API Client initialized successfully.");
  } catch (err) {
    console.error("Error initializing Gemini client:", err);
  }
} else {
  console.log("No valid GEMINI_API_KEY env found. Server will run with local clinical rule engines.");
}

// API: Health probe
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", aiPowered: !!ai });
});

// API: Process drug interactions using Gemini
app.post("/api/interact", async (req, res) => {
  const { medicines } = req.body;

  if (!medicines || !Array.isArray(medicines) || medicines.length < 2) {
    return res.status(400).json({
      error: "Se requieren al menos dos medicamentos seleccionados para analizar sus interacciones."
    });
  }

  const medicNames = medicines.map((m: any) => `${m.genericName} (${m.presentation})`).join(", ");

  // If Gemini is not configured, we return a fallback response letting the user know they can plug in a key,
  // but let's make sure it's a helpful message. It should still run our local DB calculations in the UI!
  if (!ai) {
    return res.json({
      aiPowered: false,
      summary: "Análisis Clínico Local Activo",
      severity: "Ninguna",
      details: [],
      generalClinicalAdvice: "Active la clave API de Gemini en Settings > Secrets para obtener una evaluación por IA clínica avanzada.",
      markdown: "### 💡 Análisis Clínico por IA de Gemini Desactivado\n\nEl sistema de contingencia local está calculando las interacciones. Para habilitar el análisis en tiempo real conducido por la Inteligencia Artificial de Google Gemini, configure su `GEMINI_API_KEY` en el menú **Settings > Secrets**."
    });
  }

  try {
    const listDescription = medicines.map((m: any) => {
      return `- **${m.genericName}**: Composición: ${m.composition}. Indicaciones: ${m.indications}. Contraindicaciones: ${m.contraindications}. Advertencias: ${m.warningsPrecautions}`;
    }).join("\n");

    const prompt = `Como un médico experto o farmacólogo clínico, evalúa las posibles interacciones medicamentosas farmacocinéticas o farmacodinámicas para la siguiente combinación de medicamentos:
${medicNames}

A continuación se detallan sus fichas técnicas de referencia:
${listDescription}

Por favor, genera un análisis riguroso y estructurado en ESPAÑOL. Responde ÚNICAMENTE con un objeto en formato JSON válido para que el software lo pueda parsear directamente. No incluyas explicaciones adicionales fuera del JSON.

El esquema del JSON debe ser exactamente:
{
  "hasInteraction": true/false (indicar si de verdad existe riesgo documentado relevante),
  "severity": "Alta" | "Moderada" | "Leve" | "Ninguna",
  "summary": "Resumen ejecutivo resumido de la interacción (máximo 3 líneas) redactado objetivamente.",
  "details": [
    {
      "combination": "Nombre de Fármaco A + Nombre de Fármaco B",
      "severity": "Alta" | "Moderada" | "Leve",
      "mechanism": "Explicación clara del mecanismo farmacológico o fisiológico de la interacción.",
      "recommendation": "Recomendación práctica (ajuste de dosis, monitoreo ECG, espaciar tomas, contraindicado)."
    }
  ],
  "generalClinicalAdvice": "Consejo clínico general o advertencia crítica de enfermería para el personal de salud al administrar esta mezcla."
}`;

    // Robust execution with retries and multiple models
    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];
    let textOutput = "";
    let parsedResult: any = null;
    let success = false;
    let lastErrorMsg = "";

    for (const model of modelsToTry) {
      if (success) break;
      
      const attempts = 3; // Initial try + 2 retries
      for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
          console.log(`[API Call] Intento ${attempt} con modelo "${model}" para interacciones.`);
          const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              systemInstruction: "Eres un farmacólogo clínico senior. Generas análisis objetivos, breves y estrictamente basados en evidencia científica. Tu formateo debe ser exclusivamente JSON válido."
            }
          });

          textOutput = response.text || "{}";
          // Try parsing JSON to ensure it is valid
          parsedResult = JSON.parse(textOutput.trim());
          success = true;
          console.log(`[API Call] Éxito con el modelo "${model}" en el intento ${attempt}.`);
          break;
        } catch (err: any) {
          lastErrorMsg = err.message || JSON.stringify(err);
          console.error(`[API Call] Error en intento ${attempt} con "${model}":`, lastErrorMsg);
          // Simple delay before retrying
          if (attempt < attempts) {
            await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
          }
        }
      }
    }

    if (success && parsedResult) {
      return res.json({
        aiPowered: true,
        ...parsedResult
      });
    } else {
      // Both models failed all attempts. Return a gentle fallback response
      console.warn("Todos los modelos y reintentos fallaron debido a la alta demanda. Activando contingencia de seguridad local.");
      return res.json({
        aiPowered: false,
        isContingency: true,
        hasInteraction: false,
        severity: "Ninguna",
        summary: "Análisis Clínico en Contingencia Local Activa por demanda del servidor IA.",
        details: [],
        generalClinicalAdvice: "El motor de inteligencia artificial de Gemini se encuentra temporalmente indisponible debido a una sobrecarga global de peticiones. Se ha activado de manera segura el motor de análisis clínico local pre-programado sobre las fichas técnicas."
      });
    }

  } catch (error: any) {
    console.error("Gemini interaction check failure:", error);
    return res.json({
      aiPowered: false,
      isContingency: true,
      hasInteraction: false,
      severity: "Ninguna",
      summary: "Análisis Clínico Local Activo debido a un error imprevisto.",
      details: [],
      generalClinicalAdvice: `El motor de IA experimentó un fallo imprevisto (${error.message || "Uso local"}). Las interacciones registradas en el vademécum local siguen operativas.`
    });
  }
});

// Setup Vite Dev Server / Static Assets
async function boot() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware mounted.");
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log(`Serving static files from ${distPath}`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Vademecum server boot complete. Available on http://0.0.0.0:${PORT}`);
  });
}

boot().catch((err) => {
  console.error("Server boot failed:", err);
});
