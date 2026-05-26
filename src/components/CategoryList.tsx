import React from "react";
import { MedicineCategory } from "../types";
import { CATEGORIES, medicines } from "../data/medicines";
import { 
  Activity, 
  RefreshCw,
  Brain,
  Heart,
  Droplet,
  Zap,
  Flame,
  Baby,
  Beaker,
  Shield,
  Pill,
  ClipboardCheck
} from "lucide-react";

interface CategoryListProps {
  selectedCategory: MedicineCategory | null;
  onSelectCategory: (category: MedicineCategory | null) => void;
}

// Map categories to specific clinical icon, border color, and active color themes
const getCategoryMetadata = (category: MedicineCategory) => {
  switch (category) {
    case "Anestésicos y Sedantes":
      return {
        icon: Brain,
        colorHex: "#6366F1", // Indigo
        textColor: "text-indigo-600",
        bgLight: "bg-indigo-50",
        borderAccent: "border-l-indigo-500",
        selectedBg: "bg-indigo-600 border-indigo-600 text-white",
      };
    case "Analgésicos y Opioides":
      return {
        icon: Heart,
        colorHex: "#F43F5E", // Rose
        textColor: "text-rose-600",
        bgLight: "bg-rose-50",
        borderAccent: "border-l-rose-500",
        selectedBg: "bg-rose-600 border-rose-600 text-white",
      };
    case "Cardiovascular e Inotrópicos":
      return {
        icon: Activity,
        colorHex: "#EF4444", // Red
        textColor: "text-red-600",
        bgLight: "bg-red-50",
        borderAccent: "border-l-red-500",
        selectedBg: "bg-red-600 border-red-600 text-white",
      };
    case "Anticoagulantes y Hemostáticos":
      return {
        icon: Droplet,
        colorHex: "#991B1B", // Dark Red
        textColor: "text-red-700",
        bgLight: "bg-red-50/70",
        borderAccent: "border-l-[#CE1A1A]",
        selectedBg: "bg-[#CE1A1A] border-[#CE1A1A] text-white",
      };
    case "Anticonvulsionantes y Antiepilépticos":
      return {
        icon: Zap,
        colorHex: "#D97706", // Amber
        textColor: "text-amber-600",
        bgLight: "bg-amber-50",
        borderAccent: "border-l-amber-500",
        selectedBg: "bg-amber-600 border-amber-600 text-white",
      };
    case "Gastrointestinales y Antieméticos":
      return {
        icon: Flame,
        colorHex: "#0D9488", // Teal
        textColor: "text-teal-600",
        bgLight: "bg-teal-50",
        borderAccent: "border-l-teal-500",
        selectedBg: "bg-teal-600 border-teal-600 text-white",
      };
    case "Hormonas y Obstetricia":
      return {
        icon: Baby,
        colorHex: "#8B5CF6", // Purple
        textColor: "text-purple-600",
        bgLight: "bg-purple-50",
        borderAccent: "border-l-purple-500",
        selectedBg: "bg-purple-600 border-purple-600 text-white",
      };
    case "Fluidos, Electrolitos y Nutrición":
      return {
        icon: Beaker,
        colorHex: "#0284C7", // Sky blue
        textColor: "text-sky-600",
        bgLight: "bg-sky-50",
        borderAccent: "border-l-sky-500",
        selectedBg: "bg-sky-600 border-sky-600 text-white",
      };
    case "Psicofármacos":
      return {
        icon: Shield,
        colorHex: "#EC4899", // Pink
        textColor: "text-pink-600",
        bgLight: "bg-pink-50",
        borderAccent: "border-l-pink-500",
        selectedBg: "bg-pink-600 border-pink-600 text-white",
      };
    case "Vitaminas y Otros":
    default:
      return {
        icon: Pill,
        colorHex: "#10B981", // Emerald
        textColor: "text-emerald-600",
        bgLight: "bg-emerald-50",
        borderAccent: "border-l-emerald-500",
        selectedBg: "bg-emerald-600 border-emerald-600 text-white",
      };
  }
};

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
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h3 className="text-[11px] font-extrabold text-[#475569] uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
          Categorización por Principio Activo / Clase Hospitalaria
        </h3>
        {selectedCategory && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-[11px] font-black uppercase tracking-wider text-blue-600 hover:text-blue-800 flex items-center gap-1.5 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 transition-all"
          >
            <RefreshCw className="w-3 h-3 text-blue-500 animate-spin" style={{ animationDuration: '3s' }} />
            <span>Ver Todo</span>
          </button>
        )}
      </div>

      {/* Grid of categories with custom clinical styles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {CATEGORIES.map((cat, idx) => {
          const isSelected = selectedCategory === cat.category;
          const dynamicCount = getCategoryCount(cat.category);
          const meta = getCategoryMetadata(cat.category);
          const CategoryIcon = meta.icon;

          return (
            <button
              key={idx}
              onClick={() => onSelectCategory(isSelected ? null : cat.category)}
              className={`text-left p-4 rounded-xl border-l-[5px] border-y border-r transition-all duration-300 cursor-pointer flex flex-col justify-between h-full hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden group ${
                isSelected
                  ? `${meta.selectedBg} border-slate-300 shadow-sm`
                  : `bg-white text-slate-800 border-slate-200/90 ${meta.borderAccent} hover:border-slate-300`
              }`}
            >
              {/* Card visual watermark */}
              <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.04] group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <CategoryIcon className="w-24 h-24" />
              </div>

              {/* Category details & count bubble */}
              <div className="space-y-3 w-full relative z-10">
                {/* Header elements: Icon container & Drug count */}
                <div className="flex items-center justify-between gap-2.5">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? "bg-white/20 text-white" : `${meta.bgLight} ${meta.textColor}`
                  } transition-colors`}>
                    <CategoryIcon className="w-4.5 h-4.5" />
                  </div>
                  
                  <span className={`text-[10px] font-mono font-black py-1 px-2.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.03)] ${
                    isSelected ? "bg-white text-slate-900" : "bg-slate-100/90 text-slate-600"
                  }`}>
                    {dynamicCount} FÓRMULAS
                  </span>
                </div>

                {/* Info block: Title and clinical summary */}
                <div className="space-y-1">
                  <span className={`block text-xs md:text-[13px] font-extrabold tracking-tight leading-snug ${
                    isSelected ? "text-white font-black" : "text-slate-900"
                  }`}>
                    {cat.category}
                  </span>
                  <p className={`text-[11px] leading-relaxed line-clamp-2 md:line-clamp-3 ${
                    isSelected ? "text-white/85" : "text-slate-500 font-medium"
                  }`}>
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Status indicator footer bar inside the card */}
              <div className="mt-4 pt-2 border-t border-dashed w-full flex items-center justify-between text-[10px] uppercase font-bold tracking-wider relative z-10 border-transparent">
                {isSelected ? (
                  <div className="text-white flex items-center gap-1">
                    <ClipboardCheck className="w-3.5 h-3.5 text-green-300 inline" />
                    <span className="text-[9px] tracking-wide">Filtro activo</span>
                  </div>
                ) : (
                  <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 text-[9px] tracking-wide">
                    Filtrar por esta clase <span>→</span>
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

