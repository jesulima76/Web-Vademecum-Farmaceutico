import React from "react";
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
  CheckCircle,
  Package,
  Check,
  ChevronLeft
} from "lucide-react";

interface MedicineDetailProps {
  medicine: Medicine;
  onAddToCompare?: (medicine: Medicine) => void;
  isAddedToCompare?: boolean;
  onBack?: () => void;
}

export const MedicineDetail: React.FC<MedicineDetailProps> = ({
  medicine,
  onAddToCompare,
  isAddedToCompare = false,
  onBack
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div id={`medicine-detail-${medicine.id}`} className="bg-white rounded-2xl border border-slate-200/85 shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 print:shadow-none print:border-none">
      {/* Action Header bar */}
      <div className="bg-slate-50/70 px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Volver</span>
            </button>
          )}
          <span className="text-xs font-mono py-1 px-2.5 bg-slate-200/70 text-slate-700 rounded-full font-bold">
            Medicamento N° {medicine.id}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onAddToCompare && (
            <button
              onClick={() => onAddToCompare(medicine)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                isAddedToCompare
                  ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xs"
              }`}
            >
              <Plus className={`w-3.5 h-3.5 transition-transform ${isAddedToCompare ? "rotate-45 text-amber-600" : ""}`} />
              <span>{isAddedToCompare ? "Quitar de Verificador" : "Analizar Interacción"}</span>
            </button>
          )}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:shadow-xs transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Ficha</span>
          </button>
        </div>
      </div>

      {/* Main Datasheet Body - Replicating Image Layout */}
      <div className="p-6 md:p-8 space-y-6 print:p-0">
        
        {/* Header - Drug name and brand mappings */}
        <div className="relative pl-6 border-l-8 border-red-600">
          <div className="flex items-center gap-3.5">
            <h1 className="text-3xl md:text-4 text-slate-900 tracking-tight font-extrabold uppercase print:text-2xl">
              {medicine.genericName}
            </h1>
            {medicine.isCritical && (
              <span className="hidden md:inline-flex items-center gap-1.5 py-1 px-3 text-[11px] font-bold tracking-wider text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 uppercase rounded-full animate-pulse print:hidden">
                <AlertOctagon className="w-3 h-3 text-red-600" /> Alerta Crítica
              </span>
            )}
          </div>
          
          <div className="mt-2 text-slate-500 text-sm flex flex-wrap items-center gap-x-2 gap-y-1 font-sans">
            <span className="font-semibold text-slate-700">🔹 Genérico:</span> 
            <span className="mr-4">{medicine.genericName}</span>
            <span className="text-slate-300">|</span>
            <span className="font-semibold text-slate-700">🔹 Comercial:</span>
            <span className="font-medium italic">
              {medicine.brandNames.map(b => `${b}®`).join(", ")}
            </span>
          </div>
        </div>

        {/* Technical Data Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden shadow-xs print:shadow-none bg-slate-50/20">
          <div className="divide-y divide-slate-200">
            
            {/* ROW 1: COMPOSICIÓN */}
            <div className="grid grid-cols-1 md:grid-cols-4 items-stretch divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="bg-slate-50 p-4 font-bold text-slate-700 flex items-center gap-2.5 text-xs tracking-wider uppercase col-span-1 select-none">
                <div className="p-1.5 bg-red-50 text-red-600 rounded">
                  <Pill className="w-4 h-4" />
                </div>
                <span>Composición</span>
              </div>
              <div className="p-4 bg-white text-sm text-slate-800 md:col-span-3 leading-relaxed">
                {medicine.composition}
              </div>
            </div>

            {/* ROW 2: INDICACIONES */}
            <div className="grid grid-cols-1 md:grid-cols-4 items-stretch divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="bg-slate-50 p-4 font-bold text-slate-700 flex items-center gap-2.5 text-xs tracking-wider uppercase col-span-1 select-none">
                <div className="p-1.5 bg-amber-50 text-amber-600 rounded">
                  <Activity className="w-4 h-4" />
                </div>
                <span>Indicaciones</span>
              </div>
              <div className="p-4 bg-white text-sm text-slate-800 md:col-span-3 leading-relaxed">
                {medicine.indications}
              </div>
            </div>

            {/* ROW 3: CONTRAINDICACIONES */}
            <div className="grid grid-cols-1 md:grid-cols-4 items-stretch divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="bg-slate-50 p-4 font-bold text-slate-700 flex items-center gap-2.5 text-xs tracking-wider uppercase col-span-1 select-none">
                <div className="p-1.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span>Contraindicaciones</span>
              </div>
              <div className="p-4 bg-white text-sm text-slate-800 md:col-span-3 leading-relaxed font-normal">
                {medicine.contraindications}
              </div>
            </div>

            {/* ROW 4: POSOLOGÍA */}
            <div className="grid grid-cols-1 md:grid-cols-4 items-stretch divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="bg-slate-50 p-4 font-bold text-slate-700 flex items-center gap-2.5 text-xs tracking-wider uppercase col-span-1 select-none">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
                  <Clock className="w-4 h-4" />
                </div>
                <span>Posología</span>
              </div>
              <div className="p-4 bg-white text-sm text-slate-800 md:col-span-3 leading-relaxed font-mono text-slate-900">
                {medicine.dosage}
              </div>
            </div>

            {/* ROW 5: REACCIONES ADVERSAS */}
            <div className="grid grid-cols-1 md:grid-cols-4 items-stretch divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="bg-slate-50 p-4 font-bold text-slate-700 flex items-center gap-2.5 text-xs tracking-wider uppercase col-span-1 select-none">
                <div className="p-1.5 bg-green-50 text-green-600 rounded">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <span>Reacciones Adversas</span>
              </div>
              <div className="p-4 bg-white text-sm text-slate-800 md:col-span-3 leading-relaxed">
                {medicine.adverseReactions}
              </div>
            </div>

            {/* ROW 6: ADVERTENCIAS / PRECAUCIONES */}
            <div className="grid grid-cols-1 md:grid-cols-4 items-stretch divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="bg-slate-50 p-4 font-bold text-slate-700 flex items-center gap-2.5 text-xs tracking-wider uppercase col-span-1 select-none">
                <div className="p-1.5 bg-rose-50 text-rose-600 rounded">
                  <AlertOctagon className="w-4 h-4" />
                </div>
                <span>Precauciones</span>
              </div>
              <div className="p-4 bg-white text-sm text-slate-800 md:col-span-3 leading-relaxed">
                {medicine.warningsPrecautions}
              </div>
            </div>

          </div>
        </div>

        {/* Presentación - Bright light blue block */}
        <div className="p-4 rounded-lg bg-sky-50 text-sky-900 border border-sky-100 flex items-center gap-3">
          <div className="p-1.5 bg-white/70 text-sky-700 rounded-full">
            <Check className="w-4 h-4" />
          </div>
          <p className="text-sm font-medium">
            <span className="font-extrabold uppercase mr-1">Presentación:</span> {medicine.presentation}
          </p>
        </div>

        {/* Warning label / Critical alert - Pinkish light red block */}
        {medicine.isCritical && (
          <div className="p-4 rounded-lg bg-rose-50 text-rose-900 border border-rose-100 flex items-start gap-3">
            <div className="p-1.5 bg-white/70 text-red-600 rounded-full mt-0.5">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm leading-relaxed">
                <span className="font-extrabold uppercase mr-1 text-red-700">Advertencia Crítica:</span> 
                {medicine.warningsPrecautions.replace(/^Crítica:\s*/i, "")}
              </p>
              <p className="text-[11px] text-red-600/80 font-medium mt-1 uppercase tracking-wide">
                ⚠️ Vigilancia Farmacológica Prioritaria - Confirmar dosis antes de preparar.
              </p>
            </div>
          </div>
        )}

        {/* Dynamic educational footnote */}
        <div className="text-[11px] text-slate-400 text-center font-sans mt-4 border-t border-slate-100 pt-3 flex items-center justify-between">
          <span>Clasificación del Vademécum</span>
          <span className="font-medium py-0.5 px-2 bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500 rounded uppercase text-[10px]">
            {medicine.category}
          </span>
          <span className="hidden sm:-inline">Basado en datos CSV oficiales anexos</span>
        </div>

      </div>
    </div>
  );
};
