import React from "react";
import { MedicineCategory } from "../types";
import { CATEGORIES, medicines } from "../data/medicines";
import { Activity, ShieldAlert, HeartPulse, RefreshCw } from "lucide-react";

interface CategoryListProps {
  selectedCategory: MedicineCategory | null;
  onSelectCategory: (category: MedicineCategory | null) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  // Count active principles in each category dynamically
  const getCategoryCount = (cat: MedicineCategory) => {
    return medicines.filter((m) => m.category === cat).length;
  };

  return (
    <div className="space-y-4">
      {/* List Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Categorización por Principio Activo / Clase
        </h3>
        {selectedCategory && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Restaurar Filtro</span>
          </button>
        )}
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CATEGORIES.map((cat, idx) => {
          const isSelected = selectedCategory === cat.category;
          const dynamicCount = getCategoryCount(cat.category);

          return (
            <button
              key={idx}
              onClick={() => onSelectCategory(isSelected ? null : cat.category)}
              className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-full hover:shadow-md ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600 shadow-[0_1px_3px_rgba(0,0,0,0.05)] scale-[0.99] md:scale-100"
                  : "bg-white text-slate-800 border-slate-200/80 hover:border-blue-200 hover:bg-slate-50/50"
              }`}
            >
              {/* Category details & count bubble */}
              <div className="space-y-2 w-full">
                <div className="flex items-start justify-between gap-2.5">
                  <span className={`text-sm font-extrabold tracking-tight leading-snug ${isSelected ? "text-white" : "text-slate-900"}`}>
                    {cat.category}
                  </span>
                  <span className={`text-[10px] font-mono font-black py-0.5 px-2 rounded-full leading-none shrink-0 ${
                    isSelected ? "bg-white text-blue-700" : "bg-slate-100 text-slate-600"
                  }`}>
                    {dynamicCount} Fármacos
                  </span>
                </div>
                <p className={`text-xs leading-normal ${isSelected ? "text-blue-100" : "text-slate-500"}`}>
                  {cat.description}
                </p>
              </div>

              {/* Status indicator line */}
              {isSelected && (
                <div className="mt-4 text-[10px] font-extrabold tracking-wide text-white/90 uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                  Filtrando por esta clase
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
