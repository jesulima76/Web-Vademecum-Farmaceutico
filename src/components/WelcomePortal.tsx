import React, { useState } from "react";
// @ts-ignore
import pharmacistHeroImg from "../assets/images/pharmacist_hero_1779833969692.png";
import { MedicineCategory } from "../types";
import { 
  Search, 
  ArrowRight, 
  Layers, 
  Shuffle, 
  Sparkles, 
  AlertOctagon, 
  BookOpen, 
  ShieldAlert, 
  Heart, 
  Activity, 
  Brain,
  GraduationCap
} from "lucide-react";

interface WelcomePortalProps {
  onEnterDirectory: (initialSearch?: string) => void;
  onEnterChecker: () => void;
  onSelectCategory: (category: MedicineCategory) => void;
  totalMedicines: number;
}

export const WelcomePortal: React.FC<WelcomePortalProps> = ({
  onEnterDirectory,
  onEnterChecker,
  onSelectCategory,
  totalMedicines,
}) => {
  const [quickSearch, setQuickSearch] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEnterDirectory(quickSearch);
  };

  const featuredCategories: { name: MedicineCategory; desc: string; icon: React.ComponentType<any>; color: string; bg: string }[] = [
    {
      name: "Cardiovascular e Inotrópicos",
      desc: "Reguladores de la presión arterial, antiarrítmicos y soporte cardíaco crítico.",
      icon: Activity,
      color: "text-red-600 border-red-200",
      bg: "bg-red-50",
    },
    {
      name: "Anestésicos y Sedantes",
      desc: "Inductores neuromusculares, sedación paliativa y agentes anestésicos generales.",
      icon: Brain,
      color: "text-indigo-600 border-indigo-200",
      bg: "bg-indigo-50",
    },
    {
      name: "Anticoagulantes y Hemostáticos",
      desc: "Terapia antitrombótica de emergencia y reguladores de coagulación sanguínea.",
      icon: ShieldAlert,
      color: "text-rose-700 border-rose-200",
      bg: "bg-rose-50",
    },
    {
      name: "Analgésicos y Opioides",
      desc: "Control del dolor severo y analgesia de alta prioridad hospitalaria.",
      icon: Heart,
      color: "text-rose-500 border-rose-200",
      bg: "bg-rose-50/50",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* 1. PROFESSIONAL HERO BANNER WITH DEEP DARK SLATE GRID */}
      <div className="bg-[#0F172A] rounded-2xl overflow-hidden shadow-xl border border-slate-800 text-white relative">
        {/* Subtle background graphic line grid pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="p-6 md:p-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Main Hero contents */}
            <div className="lg:col-span-8 space-y-5">
              
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-white uppercase">
                  Vademécum <span className="text-blue-400 font-mono font-extrabold">Farmacéutico</span>
                </h1>
                <p className="text-sm md:text-base text-slate-300 font-medium max-w-2xl leading-relaxed">
                  Guía digitalizada y optimizada de principios activos críticos, diseñada para el estudio clínico y el chequeo automatizado de interacciones farmacológicas de alta fidelidad.
                </p>
              </div>

              {/* Quick search input in Hero */}
              <form onSubmit={handleSearchSubmit} className="max-w-xl">
                <div className="relative flex items-center bg-slate-900/90 border border-slate-700 rounded-xl p-1.5 focus-within:border-blue-400 transition-colors">
                  <Search className="text-slate-400 w-4 h-4 ml-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Buscar medicamentos por nombre genérico o marca comercial..."
                    value={quickSearch}
                    onChange={(e) => setQuickSearch(e.target.value)}
                    className="w-full text-xs md:text-sm bg-transparent border-none outline-none text-white placeholder-slate-400 px-2 py-1"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 font-bold ml-1.5 px-4 py-2 rounded-lg text-xs tracking-wide transition-all uppercase cursor-pointer text-white shrink-0"
                  >
                    Buscar
                  </button>
                </div>
              </form>
            </div>

            {/* Pharmaceutical Image Banner */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center overflow-hidden bg-slate-900/40 border border-slate-800 rounded-2xl text-center h-48 md:h-64 relative group shadow-inner">
              <img 
                src={pharmacistHeroImg} 
                alt="Farmacéutica y Consulta de Principios Activos" 
                className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700 select-none cursor-pointer"
                referrerPolicy="no-referrer"
              />
              {/* Dark gradient overlay for legibility & clinical depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 text-left z-10 pointer-events-none">
                <span className="text-[10px] font-mono font-black text-blue-400 tracking-widest block uppercase">UJAP - VALENCIA</span>
                <p className="font-black text-xs text-slate-100 uppercase tracking-wide leading-tight mt-0.5">ESTUDIOS TÉCNICOS EN FARMACIA</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. STATS & INDICATORS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-2xl font-black text-slate-900 leading-tight">
              {totalMedicines} Fórmulas
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Catálogo medicinal indexado
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-2xl font-black text-slate-900 leading-tight">
              10 Clases
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Categorías terapéuticas críticas
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <Shuffle className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-2xl font-black text-slate-900 leading-tight">
              Sinergia IA
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Chequeo activo con Gemini
            </span>
          </div>
        </div>

      </div>

      {/* 3. CORE MODULE ENTRY POINTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Module 1: Catalog Directory */}
        <div className="bg-white border border-slate-200/85 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-6 group">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase rounded border border-blue-100">
              <BookOpen className="w-3.5 h-3.5" />
              <span>CATÁLOGO DIGITAL</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              Directorio de Fórmulas y Medicamentos
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore el catálogo completo de fármacos autorizados. Filtre por indicación clínica, contraindicaciones estrictas, reacciones adversas y formatos de dosificación de forma ágil y precisa.
            </p>
          </div>
          <button
            onClick={() => onEnterDirectory()}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_2px_4px_rgba(37,99,235,0.15)] group-hover:shadow-[0_4px_8px_rgba(37,99,235,0.25)] cursor-pointer"
          >
            <span>Explorar Directorio Clínico</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Module 2: Interaction Analyzer */}
        <div className="bg-white border border-slate-200/85 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-6 group">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 text-[10px] font-extrabold uppercase rounded border border-amber-100">
              <Shuffle className="w-3.5 h-3.5" />
              <span>SEGURIDAD EN PRESCRIPCIÓN</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              Analizador de Interacciones Automático
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cargue múltiples fármacos clínicos en la bandeja quirúrgica interactiva. Nuestro validador cruzará los compuestos analizados alertando sobre riesgos leves, moderados o mortales, respaldado por IA de asistencia avanzada.
            </p>
          </div>
          <button
            onClick={onEnterChecker}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_2px_4px_rgba(15,23,42,0.15)] group-hover:shadow-[0_4px_8px_rgba(15,23,42,0.25)] cursor-pointer"
          >
            <span>Iniciar Chequeo de Interacción</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* 4. CHOOSE FROM CHOP/HOSPITAL CATEGORIES (Interactive shortcuts) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-3xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase text-[#0F766E] tracking-wider mb-0.5">
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>Accesos Rápidos Clínicos</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Exploración Temática de Clases Farmacológicas
          </h3>
          <p className="text-xs text-slate-400">
            Haga clic en cualquiera de las siguientes clases autorizadas para dirigirse al directorio con el filtro pre-seleccionado:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCategories.map((c, i) => {
            const Icon = c.icon;
            return (
              <button
                key={i}
                onClick={() => onSelectCategory(c.name)}
                className={`text-left p-4 rounded-xl border border-slate-150 bg-white hover:border-slate-350 transition-all cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 flex flex-col justify-between h-full group`}
              >
                <div className="space-y-3">
                  <div className={`p-2 rounded-lg w-fit ${c.bg} ${c.color.split(" ")[0]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase leading-snug">
                      {c.name}
                    </span>
                    <p className="text-[10.5px] text-slate-500 font-medium leading-normal line-clamp-3">
                      {c.desc}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-2 text-[10px] text-blue-600 font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  <span>Filtrar Clase</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. ACADEMIC SYNOPSIS BANNER */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-200 text-slate-700 text-[9px] font-extrabold uppercase rounded">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Enfoque Pedagógico</span>
          </span>
          <h3 className="text-base font-bold text-slate-800 tracking-tight">
            Tesis y Práctica Académica del Curso Clínico en Farmacia
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
            Este software fue impulsado de manera conjunta por los estudiantes del curso técnico para mitigar errores de interacción medicamentosa en salas de terapia intensiva y de urgencias. El sistema incluye marcas comerciales corrientes del mercado andino y latinoamericano (tales como Atlansil, Concor, Depakene, Beloc, entre otros).
          </p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <button
            onClick={() => onEnterDirectory()}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-3xs"
          >
            Ver Manual Metodológico
          </button>
        </div>
      </div>

    </div>
  );
};
