import React from "react";
import { Medicine } from "../types";
import { AlertOctagon, Plus, ClipboardCheck, AlertTriangle } from "lucide-react";

interface MedicineCardProps {
  medicine: Medicine;
  onSelect: (medicine: Medicine) => void;
  onAddToCompare: (medicine: Medicine) => void;
  isAddedToCompare: boolean;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  onSelect,
  onAddToCompare,
  isAddedToCompare
}) => {
  // Parse routes of administration from the dosage and presentation text for quick badges
  const dosageLower = (medicine.dosage || "").toLowerCase() + " " + (medicine.presentation || "").toLowerCase();
  const showIV = dosageLower.includes("iv") || dosageLower.includes("endovenos") || dosageLower.includes("intravenos");
  const showVO = dosageLower.includes("vo") || dosageLower.includes("oral") || dosageLower.includes("comprimido") || dosageLower.includes("jarabe") || dosageLower.includes("tableta");
  const showIM = dosageLower.includes("im") || dosageLower.includes("intramuscular");

  const headerBgColor = medicine.isCritical ? "bg-[#CE1A1A]" : "bg-[#D97706]";

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-[0_2px_4px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden h-full group">
      
      {/* 1. BRANDING COLOR-CODED HEADER (Strictly like the image) */}
      <div className={`${headerBgColor} p-4 text-white flex flex-col justify-between min-h-[110px]`}>
        {/* Top bar layer */}
        <div className="flex items-center justify-between gap-1.5 w-full">
          <span className="text-[10px] font-sans font-bold tracking-widest text-white/90 uppercase">
            FICHA N.º {medicine.id}
          </span>
          
          {/* Severity status badge */}
          {medicine.isCritical ? (
            <div className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase bg-red-950/35 border border-white/20 px-2 py-0.5 rounded-full text-white tracking-wider">
              <AlertOctagon className="w-3 h-3 text-red-200" />
              <span>CRÍTICO</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase bg-amber-950/35 border border-white/20 px-2 py-0.5 rounded-full text-white tracking-wider">
              <AlertTriangle className="w-3 h-3 text-amber-200" />
              <span>ATENCIÓN</span>
            </div>
          )}
        </div>

        {/* Content & Titles layer */}
        <div className="mt-2.5 flex justify-between items-end gap-2">
          <div className="space-y-0.5 flex-1 min-w-0">
            <h3 className="text-[13px] md:text-sm font-black text-white leading-tight tracking-tight uppercase truncate" title={medicine.genericName}>
              {medicine.genericName} {medicine.brandNames.length > 0 ? `(${medicine.brandNames.join(", ")})` : ""}
            </h3>
            <p className="text-[10.5px] text-white/90 font-medium italic truncate">
              {medicine.composition}
            </p>
          </div>

          {/* Admin routes pills tag layer */}
          <div className="flex gap-1 shrink-0 select-none pb-0.5">
            {showIV && (
              <span className="text-[9.5px] font-black text-blue-600 border border-blue-400 bg-white rounded-md px-1 py-0.5 min-w-[20px] text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                IV
              </span>
            )}
            {showVO && (
              <span className="text-[9.5px] font-black text-emerald-600 border border-emerald-400 bg-white rounded-md px-1 py-0.5 min-w-[20px] text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                VO
              </span>
            )}
            {showIM && (
              <span className="text-[9.5px] font-black text-indigo-600 border border-indigo-400 bg-white rounded-md px-1 py-0.5 min-w-[20px] text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                IM
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. CARD CONTENT - CLINICAL FIELDS */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
        
        {/* Row 1: INDICACIÓN TERAPÉUTICA (Teal/Blue text) */}
        <div>
          <span className="block text-[9.5px] font-extrabold uppercase tracking-wider text-[#0F766E] mb-0.5">
            INDICACIÓN TERAPÉUTICA
          </span>
          <p className="text-[11px] text-slate-700 font-medium leading-relaxed col-span-1 line-clamp-2 md:line-clamp-3 min-h-[32px]">
            {medicine.indications}
          </p>
        </div>

        {/* Row 2: DOSIFICACIÓN & ADMINISTRACIÓN (Green text, Bold clinical instructions) */}
        <div>
          <span className="block text-[9.5px] font-extrabold uppercase tracking-wider text-[#047857] mb-0.5">
            DOSIFICACIÓN & ADMINISTRACIÓN
          </span>
          <p className="text-[11px] text-slate-900 font-extrabold leading-relaxed line-clamp-2 md:line-clamp-3 min-h-[32px]">
            {medicine.dosage}
          </p>
        </div>

        {/* Row 3: CONTRAINDICACIONES ESTRICTAS (Red/Maroon text) */}
        <div>
          <span className="block text-[9.5px] font-extrabold uppercase tracking-wider text-[#B91C1C] mb-0.5">
            CONTRAINDICACIONES ESTRICTAS
          </span>
          <p className="text-[11px] text-red-900 font-semibold leading-relaxed line-clamp-2 md:line-clamp-3 min-h-[32px]">
            {medicine.contraindications}
          </p>
        </div>

        {/* Row 4: PRESENTACIÓN & RAM (Dual layout) */}
        <div className="grid grid-cols-2 border-t border-b border-slate-100 py-2 divide-x divide-slate-100 select-none">
          <div className="pr-2 min-w-0">
            <span className="block text-[8.5px] font-extrabold uppercase text-slate-400 tracking-wider">
              PRESENTACIÓN
            </span>
            <p className="text-[10px] text-slate-700 font-semibold truncate leading-normal" title={medicine.presentation}>
              {medicine.presentation}
            </p>
          </div>
          <div className="pl-2 min-w-0">
            <span className="block text-[8.5px] font-extrabold uppercase text-slate-400 tracking-wider">
              REACCIÓN ADVERSA (RAM)
            </span>
            <p className="text-[10px] text-slate-700 font-semibold truncate leading-normal" title={medicine.adverseReactions}>
              {medicine.adverseReactions}
            </p>
          </div>
        </div>

        {/* Row 5: ADVERTENCIA CRÍTICA / ATENCIÓN BOX (Exactly styled warning block) */}
        <div className={`p-2.5 rounded-lg border flex gap-2 items-start text-[10px] leading-relaxed transition-colors ${
          medicine.isCritical
            ? "bg-rose-50/70 border-rose-200/90 text-rose-800"
            : "bg-amber-50/70 border-amber-200/90 text-amber-800"
        }`}>
          <AlertOctagon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${medicine.isCritical ? "text-red-600 animate-pulse" : "text-amber-600"}`} />
          <div className="min-w-0">
            <span className="font-extrabold uppercase mr-1 tracking-wider text-[8.5px] block">
              {medicine.isCritical ? "⚠️ ADVERTENCIA CRÍTICA" : "⚠️ ADVERTENCIA SEGURIDAD"}
            </span>
            <p className="font-medium line-clamp-2">
              {medicine.warningsPrecautions.replace(/^Crítica:\s*/i, "")}
            </p>
          </div>
        </div>

      </div>

      {/* 3. CARD FOOTER CONTROLS */}
      <div className="bg-slate-50/80 px-4 py-2.5 border-t border-slate-100 flex items-center justify-between gap-1.5 select-none text-[11px]">
        {/* Toggle compare list */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCompare(medicine);
          }}
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10.5px] font-bold transition-all cursor-pointer ${
            isAddedToCompare
              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
          }`}
          title={isAddedToCompare ? "Quitar del chequeo" : "Añadir al chequeo"}
        >
          {isAddedToCompare ? (
            <>
              <ClipboardCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Agregado</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 text-slate-500" />
              <span>Analizar</span>
            </>
          )}
        </button>

        {/* View Details */}
        <button
          onClick={() => onSelect(medicine)}
          className="text-[10px] font-black tracking-wider text-blue-600 hover:text-blue-800 flex items-center gap-0.5 transition-colors uppercase cursor-pointer group py-1"
        >
          <span>AMPLIAR DETALLES</span>
          <span className="group-hover:translate-x-0.5 transition-transform font-bold">→</span>
        </button>
      </div>

    </div>
  );
};

