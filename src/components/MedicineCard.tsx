import React from "react";
import { Medicine } from "../types";
import { AlertOctagon, ArrowRight, Plus } from "lucide-react";

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
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col overflow-hidden h-full">
      {/* Visual Accent header */}
      <div className="p-5 flex-1 space-y-3">
        {/* Sequence & Category */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono py-0.5 px-2 bg-slate-100 text-slate-500 rounded font-bold">
            N° {medicine.id}
          </span>
          <span className="text-[9px] font-extrabold uppercase tracking-wide py-0.5 px-2 bg-blue-50 text-blue-700 rounded-md">
            {medicine.category}
          </span>
        </div>

        {/* Medication Titles */}
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
            {medicine.genericName}
          </h3>
          <p className="text-xs text-slate-500 font-medium italic truncate">
            {medicine.brandNames.map(b => `${b}®`).join(", ")}
          </p>
        </div>

        {/* Inline composition snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 md:line-clamp-3 leading-relaxed">
          <span className="font-semibold text-slate-700">Composición:</span> {medicine.composition}
        </p>

        {/* Warnings warning badge */}
        {medicine.isCritical && (
          <div className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-700 border border-red-100 font-bold py-0.5 px-2 rounded-md animate-pulse">
            <AlertOctagon className="w-3 h-3 text-red-600" />
            <span>Alerta Crítica</span>
          </div>
        )}
      </div>

      {/* Footer controls block */}
      <div className="bg-slate-50/70 px-4 py-3 border-t border-slate-100 flex items-center justify-between gap-1 mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCompare(medicine);
          }}
          className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
            isAddedToCompare
              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
              : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 border border-slate-200"
          }`}
          title={isAddedToCompare ? "Quitar del chequeo" : "Añadir al chequeo"}
        >
          <Plus className={`w-3 h-3 transition-transform ${isAddedToCompare ? "rotate-45 text-amber-600" : ""}`} />
          <span>{isAddedToCompare ? "Agregado" : "Analizar"}</span>
        </button>

        <button
          onClick={() => onSelect(medicine)}
          className="flex items-center gap-1 py-1.5 px-3 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50/50 rounded-lg group transition-colors cursor-pointer"
        >
          <span>Ficha</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
