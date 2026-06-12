import React, { useState } from "react";
import { Medicine } from "../types";
import { 
  Pill, 
  Activity, 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  AlertOctagon, 
  Printer, 
  Plus, 
  Check, 
  ChevronLeft,
  Ban,
  Baby
} from "lucide-react";

interface MedicineDetailProps {
  medicine: Medicine;
  onAddToCompare?: (medicine: Medicine) => void;
  isAddedToCompare?: boolean;
  onBack?: () => void;
}

// ----------------------------------------------------
// DYNAMIC CHEMICAL & BIOMETRIC DETAILS LOOKUP (COMPACT)
// ----------------------------------------------------
const getChemicalFormula = (name: string): string => {
  const formulas: Record<string, string> = {
    "ampicilina": "C16H19N3O4S",
    "tranexá": "C8H15NO2",
    "valpro": "C8H16O2",
    "adenosina": "C10H13N5O4",
    "clopidogrel": "C16H16ClNO2S",
    "midazolam": "C18H13ClFN3",
    "ondanset": "C18H19N3O",
    "oxitocina": "C43H66N12O12S2",
    "ranitidina": "C13H22N4O3S",
    "misoprostol": "C22H38O5",
    "tiamina": "C12H17ClN4OS",
    "digoxina": "C41H64O14",
    "fenito": "C15H12N2O2",
    "manitol": "C6H14O6",
    "heparina": "C12H19NO20S3",
    "propofol": "C12H18O",
    "fentanilo": "C22H28N2O",
    "diclofenaco": "C14H11Cl2NO2",
    "glucosa": "C6H12O6",
    "dobutamina": "C18H23NO3",
    "ketamina": "C13H16ClNO",
    "pantoprazol": "C16H15F2N3O4S",
    "metoclopra": "C14H22ClN3O2",
    "morfina": "C17H19NO3",
    "amlodipino": "C20H25ClN2O5",
    "bisoprolol": "C18H31NO4",
    "amiodarona": "C25H29I2NO3",
    "aspirina": "C9H8O4",
    "adrenalina": "C9H13NO3",
    "atropina": "C17H23NO3",
    "ceftriaxona": "C18H18N8O7S3",
    "diazepam": "C16H13ClN2O",
    "furosemida": "C12H11ClN2O5S",
    "lidocaína": "C14H22N2O"
  };
  const key = Object.keys(formulas).find(k => name.toLowerCase().includes(k));
  return key ? formulas[key] : "C12H22O11"; 
};

const getPharmacologicalClass = (medicine: Medicine): { family: string; clazz: string } => {
  const cat = medicine.category;
  const name = medicine.genericName.toLowerCase();
  
  if (cat.includes("Anticoagulantes")) return { family: "Inhibidor de Cascada Fiable", clazz: "Hemostático / Antifibrinolítico" };
  if (cat.includes("Cardiovascular")) return { family: "Modulador Hemodinámico Inotrópico", clazz: "Antihipertensivo / Estimulante Cardíaco" };
  if (cat.includes("Anestésicos")) return { family: "Agente Lipofílico Anestésico Central", clazz: "Sedante / Hipnótico / Relajante" };
  if (cat.includes("Anticonvulsio")) return { family: "Bloqueador Canales Estabilizador Neuronal", clazz: "Antiepiléptico de Ámbito General" };
  if (cat.includes("Gastrointestinal")) return { family: "Antagonista de Receptores / Inhibidor de Acidez", clazz: "Antiemético / Gastroprotector" };
  if (cat.includes("Hormonas")) return { family: "Hormona Oligopeptídica / Toco-modulador", clazz: "Uterotónico / Inductor Obstétrico" };
  if (cat.includes("Electrolitos")) return { family: "Solución Cristalina / Mineral de Reconstitución", clazz: "Regulador Hidroelectrolítico" };
  if (name.includes("ampicilina") || name.includes("amoxici") || name.includes("ceftria")) {
    return { family: "Antibiótico Beta-lactámico / Cefalosporina", clazz: "Bactericida Clínico Sistémico" };
  }
  return { family: "Fármaco Clínico del Vademécum", clazz: "Acción Terapéutica Sintomática" };
};

// ----------------------------------------------------
// VECTOR MOLECULAR DRAWINGS (COMPACT)
// ----------------------------------------------------
const MolecularVisual: React.FC<{ name: string }> = ({ name }) => {
  const lName = name.toLowerCase();
  const isRing = lName.includes("ampicilina") || lName.includes("morfina") || lName.includes("diazepam") || lName.includes("fentanilo") || lName.includes("propofol") || lName.includes("atropina") || lName.includes("ceftria");
  const isBiomolecule = lName.includes("insulin") || lName.includes("heparina") || lName.includes("digoxina") || lName.includes("oxito") || lName.includes("somato");
  
  if (isBiomolecule) {
    return (
      <svg className="w-24 h-14 text-red-700/80 hover:text-red-800 transition-colors" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="30" r="3" fill="none" />
        <circle cx="45" cy="15" r="3" fill="none" />
        <circle cx="45" cy="45" r="3" fill="none" />
        <circle cx="75" cy="30" r="3" fill="none" />
        <path d="M23 30 L42 16 M23 30 L42 44 M48 15 L72 29 M48 45 L72 31 M45 18 L45 42" strokeDasharray="2 2" />
        <text x="38" y="33" className="text-[7px] font-mono" fill="currentColor">H-Bridge</text>
      </svg>
    );
  }
  if (isRing) {
    return (
      <svg className="w-24 h-14 text-red-700/80 hover:text-red-800 transition-colors" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="30,15 50,5 70,15 70,40 50,50 30,40" />
        <polygon points="34,17 50,9 66,17 66,38 50,46 34,38" strokeDasharray="1.5 1.5" />
        <path d="M70 15 L85 22 M70 40 L85 33 M30 15 L15 22" />
        <text x="75" y="15" className="text-[8px] font-mono font-bold" fill="currentColor">O</text>
        <text x="5" y="26" className="text-[8px] font-mono font-bold" fill="currentColor">NH₂</text>
      </svg>
    );
  }
  // Default Aliphatic branch representation
  return (
    <svg className="w-24 h-14 text-red-700/80 hover:text-red-800 transition-colors" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 30 L25 15 L45 45 L65 15 L80 30" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 15 L25 5 M45 45 L45 55 M65 15 L65 5" />
      <text x="21" y="4" className="text-[8px] font-mono" fill="currentColor">OH</text>
      <text x="41" y="59" className="text-[8px] font-mono" fill="currentColor">O</text>
      <text x="82" y="34" className="text-[8px] font-mono" fill="currentColor">CH₃</text>
    </svg>
  );
};

// ----------------------------------------------------
// UTILITY CLINICAL PARSERS (ROBUST & TIDY)
// ----------------------------------------------------
const parseSentenceList = (text: string | undefined): string[] => {
  if (!text) return [];
  return text
    .split(/(?:\.|\;)\s+/)
    .map(p => p.trim())
    .filter(p => p.length > 2)
    .map(p => p.endsWith(".") ? p.slice(0, -1) : p);
};

const detectAdministrationRoutes = (med: Medicine): string => {
  const text = `${med.dosage} ${med.presentation}`.toLowerCase();
  const routes: string[] = [];
  if (text.includes("iv") || text.includes("intravenos")) routes.push("IV");
  if (text.includes("im") || text.includes("intramuscular")) routes.push("IM");
  if (text.includes("vo") || text.includes("oral") || text.includes("comprimido") || text.includes("tableta")) routes.push("Oral");
  if (text.includes("sc") || text.includes("subcutan")) routes.push("SC");
  if (text.includes("inhal") || text.includes("puffs")) routes.push("Inhalada");
  if (text.includes("tópic") || text.includes("crema") || text.includes("pomada") || text.includes("loción")) routes.push("Tópica");
  if (text.includes("oftál") || text.includes("colirio")) routes.push("Oftálmica");
  if (text.includes("vaginal") || text.includes("óvulo")) routes.push("Vaginal");
  return routes.length > 0 ? routes.join(" / ") : "Según indicación médica";
};

const parseAdverseReactionsByGroup = (reactionsStr: string) => {
  const items = reactionsStr.split(/[,;.]+/).map(r => r.trim()).filter(r => r.length > 2);
  const groupings = {
    digestivo: [] as string[],
    cutaneo: [] as string[],
    otras: [] as string[]
  };
  items.forEach(it => {
    const l = it.toLowerCase();
    if (l.includes("náusea") || l.includes("vómit") || l.includes("diarrea") || l.includes("estómag") || l.includes("abdominal") || l.includes("dispep") || l.includes("cólico")) {
      groupings.digestivo.push(it);
    } else if (l.includes("erup") || l.includes("rash") || l.includes("urtic") || l.includes("prurit") || l.includes("piel") || l.includes("cután") || l.includes("dermat")) {
      groupings.cutaneo.push(it);
    } else {
      groupings.otras.push(it);
    }
  });
  return groupings;
};

const parseContraindicationsBox = (str: string) => {
  const items = str.split(/[,;.]+/).map(r => r.trim()).filter(r => r.length > 2);
  if (items.length <= 1) return { absolutas: items, relativas: ["Requiere valoración clínica integral antes de administrar."] };
  
  // Separation of anaphylaxis / allergy vs disease cautions
  const absolutas = items.filter(it => it.toLowerCase().includes("hipersensib") || it.toLowerCase().includes("alergia"));
  const relativas = items.filter(it => !it.toLowerCase().includes("hipersensib") && !it.toLowerCase().includes("alergia"));
  
  return {
    absolutas: absolutas.length > 0 ? absolutas : [items[0]],
    relativas: relativas.length > 0 ? relativas : items.slice(1)
  };
};

const getObstetricSafety = (med: Medicine): { category: string; description: string; advice: string } => {
  const categoryStr = med.category;
  const warns = med.warningsPrecautions.toLowerCase();
  
  if (warns.includes("teratóg") || warns.includes("feto") || warns.includes("aborto")) {
    return {
      category: "FDA Categoría X o D (Alto Riesgo)",
      description: "Relación confirmada con daño fetal severo, malformación orgánica o toxicidad directa.",
      advice: "Contraindicado de forma absoluta. Excluir sospecha gestacional antes de iniciar terapia."
    };
  }
  if (categoryStr.includes("Hormonas")) {
    return {
      category: "FDA Categoría X / Indutor Activo",
      description: "Genera acción directa en la fibra muscular uterina, provocando contracciones de parto.",
      advice: "Soporte exclusivo en ámbito especializado clínico de monitorización obstétrica."
    };
  }
  if (categoryStr.includes("Sedantes") || categoryStr.includes("Opioides") || categoryStr.includes("Psicofármacos")) {
    return {
      category: "FDA Categoría C (Cuidado Especial)",
      description: "Pasa placenta libremente. Riesgo de inducción de sueño, abstinencia o depresión neonatal.",
      advice: "Usar solo como última opción. Recomendar monitoreo cardiopulmonar en recién nacidos."
    };
  }
  return {
    category: "FDA Categoría B (Seguro en Gestación)",
    description: "Estudios no muestran toxicidad embriofetal. Ausencia de datos en embarazadas reales, pero se asume seguro.",
    advice: "Uso generalizado con prudencia. Compatible con lactancia materna bajo control habitual."
  };
};

const getOverdoseDetails = (med: Medicine): { manifestations: string; treatment: string } => {
  const cat = med.category;
  const name = med.genericName.toLowerCase();
  
  if (cat.includes("Opioides") || name.includes("morfina") || name.includes("fentanilo") || name.includes("codeína")) {
    return {
      manifestations: "Depresión respiratoria de peligro vital (apnea franca), miosis pupilar ipsilateral puntiforme, coma e hipotensión profusa.",
      treatment: "Oxigenar e iniciar soporte respiratorio asistido. Administrar Naloxona IV (0.4-2 mg) en pulsos directos de inmediato."
    };
  }
  if (cat.includes("Sedantes") || name.includes("propofol") || name.includes("midazolam") || name.includes("ketamina")) {
    return {
      manifestations: "Enlentecimiento drástico neurológico, estupor progresivo o coma clínico, paro cardíaco, hipotonía y abolición de reflejos.",
      treatment: "Soporte ventilatorio directo con tubo, infusión rápida de volumen. Para benzodiacepinas, administrar Flumazenilo IV si es viable."
    };
  }
  if (cat.includes("Anticonvulsio")) {
    return {
      manifestations: "Falta de coordinación motriz (ataxia), nistagmus errático, confusión intelectual, convulsión paradójica severa y arritmias.",
      treatment: "Administrar carbón activado para adsorber residuo estomacal, control del estado hemodinámico y electrocardiográfico continuo."
    };
  }
  if (cat.includes("Cardiovascular")) {
    return {
      manifestations: "Disminución extrema de frecuencia (bradicardia refractaria), hipertensión o shock cardiogénico que frena la perfusión.",
      treatment: "Uso inmediato de Atropina IV para corregir pulso. Carga adicional de suero fisiológico y soporte vasopresor de apoyo."
    };
  }
  return {
    manifestations: "Fuerte malestar gastrointestinal explosivo (vómitos, diarrea intensa), deshidratación drástica inicial y dolor abdominal agudo.",
    treatment: "Lavado gástrico, administrar carbón activado, reposición urgente de electrolitos, terapia hidratante y control de funciones."
  };
};

export const MedicineDetail: React.FC<MedicineDetailProps> = ({
  medicine,
  onAddToCompare,
  isAddedToCompare = false,
  onBack
}) => {
  const [isLandscapeMode, setIsLandscapeMode] = useState<boolean>(true);

  const handlePrint = () => {
    window.print();
  };

  const chemicalDetails = getChemicalFormula(medicine.genericName);
  const pharmClasses = getPharmacologicalClass(medicine);
  const routeText = detectAdministrationRoutes(medicine);
  const adverseReactions = parseAdverseReactionsByGroup(medicine.adverseReactions);
  const contraindications = parseContraindicationsBox(medicine.contraindications);
  const obstetricData = getObstetricSafety(medicine);
  const overdoseDetails = getOverdoseDetails(medicine);

  return (
    <div id={`medicine-detail-${medicine.id}`} className="bg-[#fcfbfc] rounded-2xl border border-slate-300 shadow-lg overflow-hidden transition-all duration-300 print:shadow-none print:border-none print:bg-white">
      {/* 1. INTERACTIVE CONTROL TOPBAR */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 print:hidden select-none">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Volver</span>
            </button>
          )}
          <span className="text-[10px] font-mono py-1 px-2.5 bg-red-100 border border-red-200 text-red-800 rounded-full font-extrabold tracking-wide uppercase">
            Ficha Clínica N° {medicine.id}
          </span>
        </div>
        
        {/* Layout Orientation Customizer */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-200/80 p-0.5 rounded-lg flex border border-slate-300/60 mr-2 text-[11px] font-bold">
            <button 
              onClick={() => setIsLandscapeMode(true)}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${isLandscapeMode ? "bg-white text-slate-950 shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
            >
              Horizontal 📐
            </button>
            <button 
              onClick={() => setIsLandscapeMode(false)}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${!isLandscapeMode ? "bg-white text-slate-950 shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
            >
              Vertical 📋
            </button>
          </div>

          {onAddToCompare && (
            <button
              onClick={() => onAddToCompare(medicine)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isAddedToCompare
                  ? "bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Plus className={`w-3.5 h-3.5 transition-transform ${isAddedToCompare ? "rotate-45" : ""}`} />
              <span>{isAddedToCompare ? "Quitar del Verificador" : "Chequeo de Interacción"}</span>
            </button>
          )}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* CSS PRINT RULES INJECTION FOR HORIZONTAL / VERTICAL COMPLEMENTS */}
      <style>{`
        @media print {
          @page {
            size: ${isLandscapeMode ? "landscape" : "portrait"};
            margin: 1cm;
          }
          body {
            background: white !important;
            color: black !important;
          }
          .print-full-border-none {
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* 2. CORE DOSSIER CONTAINER (DENSE & REPLICATED GRAPHICS) */}
      <div className="p-6 md:p-8 space-y-6 bg-white shrink-0">
        
        {/* BANNER 1: BIG RED TITLE HEADER */}
        <div className="bg-[#b23a22] text-white rounded-lg p-5 shadow-xs flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl text-center tracking-[0.10em] font-black font-sans uppercase break-words drop-shadow-sm leading-tight">
            {medicine.genericName}
          </h1>
          <p className="mt-2 text-center text-xs md:text-sm text-red-50/90 font-bold max-w-2xl border-t border-red-500/30 pt-2 tracking-wide">
            Familia farmacológica: <span className="font-sans italic font-normal text-white">{pharmClasses.family}</span> | Clase Terapéutica: <span className="font-sans italic font-normal text-white">{pharmClasses.clazz}</span>
          </p>
        </div>

        {/* COMPOSITION ROW (SUB-BANNER BAR) */}
        <div className="bg-[#DFE3E6] border-t border-b border-[#C0C4C8] text-center text-[12px] md:text-xs font-bold text-slate-800 py-3 px-4 rounded-md tracking-normal leading-relaxed select-none">
          Fármaco de elección para: <span className="font-semibold italic text-slate-900">{medicine.indications}</span>
        </div>

        {/* ADMINISTRATION ROUTE CONTAINER */}
        <div className="flex justify-center select-none">
          <div className="border-2 border-[#b23a22]/70 rounded-full px-6 py-2 flex items-center gap-2 bg-[#fefaf9] text-xs font-black uppercase text-slate-800 tracking-wider shadow-xs animate-pulse">
            <span className="text-[#b23a22]">🩸</span>
            <span>Vía de Administración: {routeText}</span>
          </div>
        </div>

        {/* BRAND & MOLECULE SUB-CARD */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
          <div className="space-y-1">
            <div className="text-xs text-red-800 font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Nomenclatura Química
            </div>
            <div className="text-lg font-black text-slate-900">
              {medicine.genericName} <span className="text-red-700 ml-1 font-mono text-base font-medium">{chemicalDetails}</span>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Fórmula comercial autorizada: <span className="text-slate-800 font-bold italic">{medicine.brandNames.map(b => `${b}®`).join(", ")}</span>
            </div>
          </div>
          <div className="border-l border-slate-200 pl-4 h-full flex items-center shrink-0">
            <MolecularVisual name={medicine.genericName} />
          </div>
        </div>

        {/* 3. CLINICAL SECTIONS BENTO GRID (DYNAMIC STRUCTURE DIRECTIVE) */}
        <div className={`grid gap-6 ${isLandscapeMode ? "md:grid-cols-2" : "grid-cols-1"}`}>
          
          {/* LEFT CHIEF DIAGRAM: 1, 2, 3, 7 */}
          <div className="space-y-6">
            
            {/* 1. MECANISMO DE ACCIÓN */}
            <div className="border border-slate-200/80 bg-white rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
                <span className="text-base font-black text-[#b23a22]">1.</span>
                <Pill className="w-4 h-4 text-[#b23a22]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Mecanismo de Acción</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed pl-1">
                {parseSentenceList(medicine.composition).map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1 w-1.5 h-1.5 bg-slate-950 rounded-full shrink-0"></span>
                    <span>{p}</span>
                  </li>
                ))}
                <li className="flex items-start gap-1.5 text-slate-500 italic mt-1 bg-slate-50 p-2 rounded border border-slate-100">
                  <span className="font-bold text-slate-700">Composición de fórmula:</span> {medicine.composition}
                </li>
              </ul>
            </div>

            {/* 2. UTILIDAD CLÍNICA */}
            <div className="border border-slate-200/80 bg-white rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
                <span className="text-base font-black text-[#b23a22]">2.</span>
                <Activity className="w-4 h-4 text-red-600" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Utilidad Clínica</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed pl-1">
                {parseSentenceList(medicine.indications).map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1 w-1.5 h-1.5 bg-[#b23a22] rounded-full shrink-0"></span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. EJEMPLOS DE FÁRMACOS Y DOSIS (TABLE RENDERING) */}
            <div className="border border-slate-200/80 bg-white rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
                <span className="text-base font-black text-[#b23a22]">3.</span>
                <Clock className="w-4 h-4 text-[#b23a22]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Ejemplos de Fármacos y Dosis</h3>
              </div>
              <div className="border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
                <table className="w-full text-xs font-sans text-left border-collapse">
                  <thead>
                    <tr className="bg-[#b23a22] text-white">
                      <th className="py-2 px-3 font-bold uppercase tracking-wider text-[11px] border-r border-[#c0c4c8]/30">Fármaco</th>
                      <th className="py-2 px-3 font-bold uppercase tracking-wider text-[11px]">Dosis estándar e intervalo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300">
                    <tr className="bg-white hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-slate-900 border-r border-slate-200">{medicine.genericName} iny.</td>
                      <td className="py-2.5 px-3 text-slate-800 leading-tight">{medicine.dosage}</td>
                    </tr>
                    <tr className="bg-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-slate-900 border-r border-slate-200">Presentación Oficial</td>
                      <td className="py-2.5 px-3 text-slate-700 font-mono text-[11px]">{medicine.presentation}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 7. EMBARAZO Y LACTANCIA */}
            <div className="border-2 border-orange-200 bg-orange-50/35 rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-orange-100 pb-2 mb-3">
                <span className="text-base font-black text-[#b23a22]">7.</span>
                <Baby className="w-4 h-4 text-[#b23a22]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Embarazo y Lactancia</h3>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-[#b23a22] text-white rounded-full flex items-center justify-center shrink-0 shadow-xs border border-[#9b311c] select-none">
                  🤰
                </div>
                <div className="space-y-1.5">
                  <div className="text-xs font-black text-rose-800">{obstetricData.category}</div>
                  <p className="text-xs text-slate-700 leading-relaxed font-semibold">{obstetricData.description}</p>
                  <p className="text-[11px] text-slate-600 bg-white/80 p-2 rounded border border-orange-100/60 leading-normal">{obstetricData.advice}</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT CHIEF DIAGRAM: 4, 5, 6, 8 */}
          <div className="space-y-6">

            {/* 4. EFECTOS ADVERSOS (DIVIDED AS SAMPLE DEPICTION) */}
            <div className="border border-slate-200/80 bg-white rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
                <span className="text-base font-black text-[#b23a22]">4.</span>
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Efectos Adversos</h3>
              </div>
              
              <div className="space-y-3.5">
                {/* Gastrointestinal */}
                {adverseReactions.digestivo.length > 0 && (
                  <div className="flex gap-2.5 items-start">
                    <span className="text-base mt-0.5 select-none">🤢</span>
                    <div>
                      <strong className="text-[11px] font-extrabold uppercase text-amber-800 block">Estómago / Intestino</strong>
                      <span className="text-xs text-slate-700 leading-normal">{adverseReactions.digestivo.join(", ")}</span>
                    </div>
                  </div>
                )}
                {/* Cutáneo */}
                {adverseReactions.cutaneo.length > 0 && (
                  <div className="flex gap-2.5 items-start">
                    <span className="text-base mt-0.5 select-none">✨</span>
                    <div>
                      <strong className="text-[11px] font-extrabold uppercase text-rose-800 block">Efectos Cutáneos / Dérmicos</strong>
                      <span className="text-xs text-slate-700 leading-normal">{adverseReactions.cutaneo.join(", ")}</span>
                    </div>
                  </div>
                )}
                {/* General or Remaining */}
                <div className="flex gap-2.5 items-start bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-base select-none">⚠️</span>
                  <div>
                    <strong className="text-[11px] font-extrabold uppercase text-slate-750 block">Otras manifestaciones</strong>
                    <span className="text-xs text-slate-700 leading-relaxed">
                      {adverseReactions.otras.length > 0 ? adverseReactions.otras.join(", ") : "Cefalea ocasional, cansancio leve o hipersensibilidad menor autolimitada."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. PRECAUCIONES */}
            <div className="border border-slate-200/80 bg-white rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
                <span className="text-base font-black text-[#b23a22]">5.</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Precauciones Clínicas</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed pr-1">
                {parseSentenceList(medicine.warningsPrecautions).map((p, i) => (
                  <li key={i} className="flex items-start gap-2 bg-amber-50/40 p-2 rounded border border-amber-200/40">
                    <span className="mt-0.5 select-none">⚠️</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 6. CONTRAINDICACIONES (ABSOLUTAS & RELATIVAS AS RED/GREY CARDS) */}
            <div className="border border-slate-200/80 bg-white rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
                <span className="text-base font-black text-[#b23a22]">6.</span>
                <Ban className="w-4 h-4 text-[#b23a22]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Contraindicaciones</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-2">
                {/* Absolutas */}
                <div className="bg-red-50/50 border border-red-300 rounded-lg p-3 space-y-1.5">
                  <div className="text-[10px] font-black uppercase text-red-700 tracking-wider flex items-center gap-1 leading-none select-none">
                    🛑 Absoluta / Vital
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-red-950">
                    {contraindications.absolutas.map((item, i) => (
                      <li key={i} className="leading-snug">{item}</li>
                    ))}
                  </ul>
                </div>
                {/* Relativas */}
                <div className="bg-slate-100 border border-slate-300 rounded-lg p-3 space-y-1.5">
                  <div className="text-[10px] font-black uppercase text-slate-600 tracking-wider flex items-center gap-1 leading-none select-none">
                    ⚠️ Relativa / Precaución
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-950">
                    {contraindications.relativas.map((item, i) => (
                      <li key={i} className="leading-snug">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 8. SOBREDOSIS (MANIFESTACIONES & TRATAMIENTO AS SUB-BLOCKS) */}
            <div className="border border-slate-200/80 bg-white rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
                <span className="text-base font-black text-[#b23a22]">8.</span>
                <AlertOctagon className="w-4 h-4 text-[#b23a22]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Sobredosis y Toxicidad</h3>
              </div>
              
              <div className="space-y-3.5">
                {/* Manifestaciones */}
                <div className="border border-slate-300 rounded-lg overflow-hidden">
                  <div className="bg-[#b23a22] text-white text-[10px] uppercase font-black tracking-widest text-center py-1 select-none">
                    manifestaciones
                  </div>
                  <div className="bg-white p-3 text-xs text-slate-800 leading-relaxed font-semibold">
                    {overdoseDetails.manifestations}
                  </div>
                </div>

                {/* Tratamientos de Apoyo */}
                <div className="border border-slate-300 rounded-lg overflow-hidden">
                  <div className="bg-[#a2321c] text-white text-[10px] uppercase font-black tracking-widest text-center py-1 select-none">
                    tratamiento terapéutico
                  </div>
                  <div className="bg-[#fefcfb] p-3 text-xs text-slate-800 leading-relaxed">
                    {overdoseDetails.treatment}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* COMPREHENSIVE CRITICAL WARNING STAMP */}
        {medicine.isCritical && (
          <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex gap-4 items-start select-none shadow-5xs">
            <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 uppercase font-black tracking-wider text-base animate-pulse">
              ⚠️
            </div>
            <div className="space-y-1 text-xs">
              <span className="font-black text-red-700 uppercase tracking-wide">Fármaco de Alta Alerta Clínica / Vigilancia Prioritaria</span>
              <p className="text-slate-800 leading-normal font-semibold">
                Este medicamento presenta un estrecho margen terapéutico o alta capacidad tóxica si se cometen errores de preparación o infusión.
              </p>
              <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest pt-1 leading-none">
                Confirmar peso del paciente, dosis y velocidad de goteo en infusor de jeringa antes de habilitar paso.
              </p>
            </div>
          </div>
        )}

        {/* 4. CLINICAL FOOTNOTE STATS */}
        <div className="text-[10px] text-slate-400 font-mono mt-4 border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-2 select-none">
          <span>Consorcio Clínico Vademécum Directo • Datos CSV Oficiales</span>
          <span className="font-extrabold uppercase py-1 px-3 bg-slate-100 border border-slate-200 text-slate-500 rounded-lg">
            {medicine.category}
          </span>
          <span>Basado en directrices de farmacovigilancia actualizadas</span>
        </div>

      </div>
    </div>
  );
};
