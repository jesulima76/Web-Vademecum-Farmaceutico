import React, { useState, useEffect } from "react";
import { Medicine, InteractionReport, InteractionDetail } from "../types";
import { medicines, predefinedInteractions } from "../data/medicines";
import { 
  AlertTriangle, 
  Sparkles, 
  X, 
  Trash2, 
  Activity, 
  ShieldAlert, 
  Brain, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  Stethoscope
} from "lucide-react";

interface InteractionCheckerProps {
  selectedMedicines: Medicine[];
  onRemoveMedicine: (medicine: Medicine) => void;
  onAddMedicine: (medicine: Medicine) => void;
  onClearAll: () => void;
}

export const InteractionChecker: React.FC<InteractionCheckerProps> = ({
  selectedMedicines,
  onRemoveMedicine,
  onAddMedicine,
  onClearAll
}) => {
  const [localReport, setLocalReport] = useState<InteractionReport | null>(null);
  const [aiReport, setAiReport] = useState<any | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Instant local rule-based interaction calculator
  useEffect(() => {
    if (selectedMedicines.length < 2) {
      setLocalReport(null);
      setAiReport(null);
      return;
    }

    const foundDetails: InteractionDetail[] = [];
    let maxSeverity: "Alta" | "Moderada" | "Leve" | "Ninguna" = "Ninguna";

    // Compare all pairs
    for (let i = 0; i < selectedMedicines.length; i++) {
      for (let j = i + 1; j < selectedMedicines.length; j++) {
        const d1 = selectedMedicines[i];
        const d2 = selectedMedicines[j];

        // Search predefined
        const interaction = predefinedInteractions.find(
          pi => 
            (pi.drug1Id === d1.id && pi.drug2Id === d2.id) ||
            (pi.drug1Id === d2.id && pi.drug2Id === d1.id)
        );

        if (interaction) {
          foundDetails.push({
            drugs: [d1, d2],
            severity: interaction.severity,
            mechanism: interaction.mechanism,
            recommendation: interaction.recommendation
          });

          // Update maximal severity
          if (interaction.severity === "Alta") {
            maxSeverity = "Alta";
          } else if (interaction.severity === "Moderada" && maxSeverity !== "Alta") {
            maxSeverity = "Moderada";
          } else if (interaction.severity === "Leve" && maxSeverity === "Ninguna") {
            maxSeverity = "Leve";
          }
        }
      }
    }

    setLocalReport({
      medicines: selectedMedicines,
      severity: maxSeverity,
      details: foundDetails
    });

    // Reset AI report whenever the medication combination changes
    setAiReport(null);
    setAiError(null);
  }, [selectedMedicines]);

  // Handle advanced AI check
  const handleAiCheck = async () => {
    if (selectedMedicines.length < 2) return;
    setLoadingAi(true);
    setAiError(null);
    setAiReport(null);

    try {
      const response = await fetch("/api/interact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ medicines: selectedMedicines })
      });

      if (!response.ok) {
        throw new Error("La consulta de interacciones clínicas a través de la IA falló.");
      }

      const data = await response.json();
      setAiReport(data);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Error al conectar con la Inteligencia Artificial de Gemini.");
    } finally {
      setLoadingAi(false);
    }
  };

  // Quick filter to add drugs from this screen
  const filteredSuggestions = searchQuery.trim() === ""
    ? []
    : medicines.filter(
        m => 
          !selectedMedicines.some(sm => sm.id === m.id) &&
          (m.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           m.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-6 space-y-6">
      
      {/* Target header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              Verificador de Interacciones Clínicas
            </h2>
            <p className="text-xs text-slate-500">
              Analice cruces y compatibilidad en tiempo real para múltiples fármacos.
            </p>
          </div>
        </div>
        {selectedMedicines.length > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-white border border-rose-200 hover:bg-rose-600 rounded-lg transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpiar Bandeja</span>
          </button>
        )}
      </div>

      {/* Drug Picker Selector inside Checker */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Añadir Medicamento para la Combinación:
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Escriba el nombre genérico o comercial para añadir (ej: Fentanilo, Dilantin)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm px-4 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-lg shadow-2xs outline-none transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")} 
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Quick Autocomplete Panel */}
          {filteredSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="bg-slate-50 px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Sugerencias ({filteredSuggestions.length})
              </div>
              {filteredSuggestions.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    onAddMedicine(m);
                    setSearchQuery("");
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-center justify-between text-sm transition-colors cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-slate-900">{m.genericName}</span>
                    <span className="text-xs text-slate-500 ml-2">({m.brandNames.join(", ")})</span>
                  </div>
                  <span className="text-[10px] text-blue-700 bg-blue-50 font-bold px-2 py-0.5 rounded uppercase font-mono">
                    Añadir +
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Items List */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-600 block uppercase tracking-wider">
          Fármacos Seleccionados ({selectedMedicines.length})
        </span>

        {selectedMedicines.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center bg-slate-50/50">
            <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-600 font-medium">Bandeja Vacía</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Seleccione al menos dos medicamentos para iniciar el análisis automático de interacciones medicamentosas.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedMedicines.map((m) => (
              <div
                key={m.id}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-lg text-slate-700 text-sm font-medium border border-slate-200 group transition-all"
              >
                <div className="w-1.5 h-1.5 bg-blue-550 rounded-full group-hover:scale-125 transition-transform" />
                <span>{m.genericName}</span>
                <button
                  onClick={() => onRemoveMedicine(m)}
                  className="p-0.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                  title="Remover"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Check State & Reports */}
      {selectedMedicines.length >= 2 && localReport && (
        <div className="space-y-6 pt-2 animate-in fade-in duration-300">
          
          {/* RISK LEVEL STATUS BAR */}
          <div className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            localReport.severity === "Alta"
              ? "bg-red-50/70 text-red-900 border-red-200"
              : localReport.severity === "Moderada"
              ? "bg-amber-50/70 text-amber-900 border-amber-200"
              : localReport.severity === "Leve"
              ? "bg-blue-50/70 text-blue-900 border-blue-200"
              : "bg-emerald-50/70 text-emerald-900 border-emerald-100"
          }`}>
            <div className="flex items-start md:items-center gap-3">
              <div className={`p-2.5 rounded-lg shrink-0 ${
                localReport.severity === "Alta"
                  ? "bg-red-500 text-white"
                  : localReport.severity === "Moderada"
                  ? "bg-amber-500 text-white"
                  : localReport.severity === "Leve"
                  ? "bg-blue-500 text-white"
                  : "bg-emerald-500 text-white"
              }`}>
                {localReport.severity === "Ninguna" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 font-bold" />
                )}
              </div>
              <div>
                <p className="text-xs uppercase font-extrabold tracking-wider opacity-85">
                  Severidad de Cruce Local
                </p>
                <p className="text-lg font-black leading-tight">
                  {localReport.severity === "Ninguna" 
                    ? "Incompatibilidad No Documentada" 
                    : `Interacción ${localReport.severity}`}
                </p>
              </div>
            </div>

            {/* AI Advisor Button Trigger */}
            {!aiReport && !loadingAi && (
              <button
                onClick={handleAiCheck}
                className="flex items-center justify-center gap-2 py-2 px-4 shadow-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer select-none"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Consultar Motor Farmacológico IA (Gemini)</span>
              </button>
            )}
          </div>

          {/* LOCAL DOCUMENTED INTERACTIONS LIST */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Incompatibilidades Documentadas en Base Cruzada (Ficha Técnica CSV)
            </h3>

            {localReport.details.length === 0 ? (
              <div className="p-4 bg-emerald-50/30 text-emerald-800 rounded-xl space-y-1 text-sm border border-emerald-100">
                <p className="font-bold">✓ Sin alertas locales confirmadas.</p>
                <p className="text-xs text-emerald-600 leading-normal">
                  No hay interacciones críticas listadas explícitamente en el CSV para esta combinación. Verifique siempre con el motor IA de Google Gemini para cruzar mecanismos complejos, farmacocinética o riesgos de sinergia no listados.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {localReport.details.map((detail, index) => (
                  <div key={index} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 shadow-3xs">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {detail.drugs[0].genericName} + {detail.drugs[1].genericName}
                      </span>
                      <span className={`text-[10px] font-mono font-extrabold px-2.5 py-1 rounded uppercase select-none ${
                        detail.severity === "Alta"
                          ? "bg-red-100 text-red-800"
                          : detail.severity === "Moderada"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        Riesgo {detail.severity}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-3.5 rounded-xl border border-slate-100/90 shadow-3xs">
                        <span className="font-bold block text-slate-500 uppercase tracking-wide text-[9px] mb-1">Mecanismo / Efecto</span>
                        {detail.mechanism}
                      </div>
                      <div className="bg-amber-50/40 p-3.5 rounded-xl border border-amber-100 shadow-3xs">
                        <span className="font-bold block text-amber-700 uppercase tracking-wide text-[9px] mb-1 font-sans">Recomendación Clínica</span>
                        {detail.recommendation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* LOADING CLINICAL REASSURANCE FEEDBACK */}
          {loadingAi && (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-4 animate-pulse">
              <div className="flex justify-center">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full animate-bounce">
                  <Brain className="w-6 h-6" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Analizando con Inteligencia Artificial (Gemini)...</p>
                <div className="text-xs text-slate-500 mt-1 max-w-md mx-auto space-y-1">
                  <p className="font-mono">Ejecutando cruce clínico de formulaciones...</p>
                  <p className="italic text-blue-600">"El análisis por IA coteja absorción, excreción y depresiones respiratorias."</p>
                </div>
              </div>
            </div>
          )}

          {/* AI ERROR BLOCK */}
          {aiError && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-900 space-y-1 text-xs">
              <p className="font-bold">Error de Motor IA</p>
              <p>{aiError}</p>
              <button
                onClick={handleAiCheck}
                className="mt-2 text-blue-700 hover:underline font-bold"
              >
                Reintentar Análisis IA
              </button>
            </div>
          )}

          {/* GEMINI AI CLINICAL ADVISOR REPORT DISPLAY */}
          {aiReport && (
            <div className="p-5 bg-blue-50/40 border border-blue-100 rounded-2xl space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center justify-between border-b border-blue-100 pb-2.5 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Brain className="text-blue-600 w-5 h-5 shrink-0" />
                  <span className="font-bold text-sm text-blue-900 uppercase tracking-wider">
                    Análisis Farmacológico Avanzado por Gemini 3.5
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-white border border-blue-200 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full select-none">
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  <span>Cruce Clínico IA</span>
                </div>
              </div>

              {/* Summary line */}
              <p className="text-slate-800 text-sm font-medium leading-relaxed italic bg-white/70 p-3.5 rounded-lg border border-blue-100">
                "{aiReport.summary}"
              </p>

              {/* Categorized AI severity badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-medium font-sans">Estatus del cruce:</span>
                <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                  aiReport.severity === "Alta"
                    ? "bg-red-500 text-white"
                    : aiReport.severity === "Moderada"
                    ? "bg-amber-400 text-slate-900"
                    : aiReport.severity === "Leve"
                    ? "bg-blue-500 text-white"
                    : "bg-emerald-500 text-white"
                }`}>
                  Riesgo de Interacción {aiReport.severity || "Ninguno"}
                </span>
              </div>

              {/* Generated combinations details */}
              {aiReport.details && aiReport.details.length > 0 && (
                <div className="space-y-3.5 pt-1">
                  <span className="text-[10px] font-bold text-blue-800/80 uppercase tracking-wider block">
                    Mecanismos Específicos Evaluados por la IA:
                  </span>
                  <div className="grid grid-cols-1 gap-3">
                    {aiReport.details.map((det: any, idx: number) => (
                      <div key={idx} className="bg-white border border-blue-100/70 p-3.5 rounded-xl shadow-3xs space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-1 border-b border-slate-100 pb-1.5">
                          <span className="text-xs font-bold text-blue-950 font-mono bg-blue-50/50 py-0.5 px-2 rounded">
                            {det.combination}
                          </span>
                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase ${
                            det.severity === "Alta"
                              ? "bg-red-50 text-red-700"
                              : det.severity === "Moderada"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-blue-50 text-blue-700"
                          }`}>
                            Severidad: {det.severity}
                          </span>
                        </div>
                        <div className="text-xs text-slate-700 leading-relaxed space-y-1.5">
                          <p>
                            <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wide mr-1.5">Funcionamiento:</span> 
                            {det.mechanism}
                          </p>
                          <p className="bg-amber-50/30 p-2 rounded text-slate-800 border-l-2 border-amber-500 mt-1">
                            <span className="font-bold text-amber-800 uppercase text-[9px] tracking-wide mr-1.5">Recomendación:</span> 
                            {det.recommendation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nursing and Clinical advice box */}
              {aiReport.generalClinicalAdvice && (
                <div className="p-3.5 bg-white border border-blue-100/60 rounded-xl space-y-1.5 shadow-3xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase">
                    <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Indicaciones Generales de Enfermería y Administración:</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    {aiReport.generalClinicalAdvice}
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
