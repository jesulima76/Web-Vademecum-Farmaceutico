import { useState, useMemo } from "react";
import { Medicine, MedicineCategory } from "./types";
import { medicines } from "./data/medicines";
import { MedicineDetail } from "./components/MedicineDetail";
import { MedicineCard } from "./components/MedicineCard";
import { CategoryList } from "./components/CategoryList";
import { InteractionChecker } from "./components/InteractionChecker";
import { UniversitasValentinaLogo } from "./components/UniversitasValentinaLogo";
import { 
  Search, 
  Layers, 
  Shuffle, 
  AlertTriangle, 
  Filter, 
  X, 
  HelpCircle, 
  Info, 
  FileText, 
  Activity, 
  ShieldAlert, 
  Sparkles,
  ClipboardList
} from "lucide-react";

export default function App() {
  // State managers
  const [activeTab, setActiveTab] = useState<"list" | "checker">("list");
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  
  // Basic Search Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<MedicineCategory | null>(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  
  // Advanced Search Filter States
  const [searchIndications, setSearchIndications] = useState("");
  const [searchContraindications, setSearchContraindications] = useState("");
  const [searchAdverse, setSearchAdverse] = useState("");
  const [searchPresentation, setSearchPresentation] = useState("");
  const [onlyCritical, setOnlyCritical] = useState(false);

  // Interaction drawer stack selection
  const [compareList, setCompareList] = useState<Medicine[]>([]);

  // Function to add medicine to comparison list
  const handleAddToCompare = (med: Medicine) => {
    if (compareList.some(item => item.id === med.id)) {
      setCompareList(prev => prev.filter(item => item.id !== med.id));
    } else {
      if (compareList.length >= 5) {
        alert("Para propósitos clínicos, puede seleccionar un máximo de hasta 5 medicamentos simultáneos.");
        return;
      }
      setCompareList(prev => [...prev, med]);
    }
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  // Reset all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSearchIndications("");
    setSearchContraindications("");
    setSearchAdverse("");
    setSearchPresentation("");
    setOnlyCritical(false);
  };

  // Compute filtered list based on all regular and advanced criteria
  const filteredMedicines = useMemo(() => {
    return medicines.filter((m) => {
      // 1. General search (matches Name, brand or composition)
      if (searchQuery.trim() !== "") {
        const term = searchQuery.toLowerCase();
        const matchName = m.genericName.toLowerCase().includes(term);
        const matchBrand = m.brandNames.some(b => b.toLowerCase().includes(term));
        const matchComposition = m.composition.toLowerCase().includes(term);
        if (!matchName && !matchBrand && !matchComposition) {
          return false;
        }
      }

      // 2. Category classification filter
      if (selectedCategory && m.category !== selectedCategory) {
        return false;
      }

      // 3. Only critical high-risk option
      if (onlyCritical && !m.isCritical) {
        return false;
      }

      // 4. Indications matching
      if (searchIndications.trim() !== "") {
        if (!m.indications.toLowerCase().includes(searchIndications.toLowerCase())) {
          return false;
        }
      }

      // 5. Contraindications matching
      if (searchContraindications.trim() !== "") {
        if (!m.contraindications.toLowerCase().includes(searchContraindications.toLowerCase())) {
          return false;
        }
      }

      // 6. Adverse reactions matching
      if (searchAdverse.trim() !== "") {
        if (!m.adverseReactions.toLowerCase().includes(searchAdverse.toLowerCase())) {
          return false;
        }
      }

      // 7. Presentation formulation matching
      if (searchPresentation.trim() !== "") {
        if (!m.presentation.toLowerCase().includes(searchPresentation.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [
    searchQuery,
    selectedCategory,
    onlyCritical,
    searchIndications,
    searchContraindications,
    searchAdverse,
    searchPresentation
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* PROFESSIONAL CLINIC NAVBAR */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 print:hidden shadow-3xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center min-h-20 flex-wrap gap-4 py-3">
            
            {/* Branding logo */}
            <div className="flex items-center">
              <div>
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 leading-none">
                  VADEMÉCUM <span className="text-blue-600 font-extrabold font-mono font-bold">FARMACÉUTICO</span>
                </h1>
                <p className="text-[10px] md:text-xs text-slate-500 font-bold tracking-wider uppercase mt-1">
                  Universidad José Antonio Páez - Curso Técnico en Farmacia
                </p>
              </div>
            </div>

            {/* Quick Indexed Status counter banner */}
            <div className="hidden lg:flex items-center gap-4 text-xs">
              <div className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-semibold text-slate-600">CSV Indexado:</span>
                <span className="font-bold text-slate-900">{medicines.length} Fórmulas</span>
              </div>
              <div className="bg-blue-50/50 px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-bold text-blue-800">Motor IA Listo</span>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* DYNAMIC SYSTEM ALERTS HEADER ON TRAY */}
      {compareList.length > 0 && (
        <div className="bg-amber-600 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between gap-4 print:hidden transition-all shadow-md">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 animate-bounce" />
              <span>
                Verificador Activo: {compareList.length} medicamento{compareList.length > 1 ? "s" : ""} en la bandeja para chequeo cruzado de interacciones.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab("checker");
                  setSelectedMedicine(null);
                }}
                className="bg-white text-slate-900 px-3 py-1 rounded-md text-[11px] font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Analizar Ahora →
              </button>
              <button
                onClick={handleClearCompare}
                className="text-white/80 hover:text-white underline text-[11px] font-medium cursor-pointer"
              >
                Vaciar Tray
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT GATEWAY CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-8">
        
        {/* VIEW SELECTOR TAB SWITCHER */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-1 flex-wrap gap-4 print:hidden">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveTab("list");
                // Keep selected medicine but go to directory
              }}
              className={`pb-3 px-4 text-sm font-bold tracking-tight border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "list"
                  ? "border-blue-600 text-blue-700 font-extrabold"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Directorio de Medicamentos</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("checker");
                setSelectedMedicine(null); // Clear selected screen
              }}
              className={`pb-3 px-4 text-sm font-bold tracking-tight border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "checker"
                  ? "border-blue-600 text-blue-700 font-extrabold"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Shuffle className="w-4 h-4" />
              <span>Analizar Interacciones</span>
              {compareList.length > 0 && (
                <span className="bg-amber-500 text-white font-mono text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {compareList.length}
                </span>
              )}
            </button>
          </div>

          <div className="text-xs text-slate-400 font-medium pb-2 select-none">
            Consorcio Clínico Vademécum v4.2
          </div>
        </div>

        {/* ==================== TAB 1: DIRECTORY VIEW ==================== */}
        {activeTab === "list" && (
          <div className="space-y-6">
            
            {/* If a specific drug technical sheet is opened */}
            {selectedMedicine ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                <MedicineDetail
                  medicine={selectedMedicine}
                  onAddToCompare={handleAddToCompare}
                  isAddedToCompare={compareList.some(item => item.id === selectedMedicine.id)}
                  onBack={() => setSelectedMedicine(null)}
                />
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* SEARCH UTILITIES CARD AND CATEGORY SELECTION */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5 md:p-6 space-y-4 print:hidden">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <Search className="w-4 h-4 text-blue-600" />
                        <span>Buscador Clínico Avanzado</span>
                      </h2>
                      <p className="text-xs text-slate-400">
                        Cruce indicación, contraindicación, efectos adversos o compuestos químicos.
                      </p>
                    </div>

                    {/* Reset Button */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-all ${
                          showAdvancedSearch
                            ? "bg-slate-100 text-slate-800 border-slate-300"
                            : "bg-white text-blue-600 hover:text-blue-800 border-blue-200 hover:bg-blue-50/50"
                        }`}
                      >
                        <Filter className="w-3.5 h-3.5" />
                        <span>{showAdvancedSearch ? "Ocultar Avanzada" : "Filtro Avanzado"}</span>
                      </button>
                      
                      {(searchQuery || selectedCategory || onlyCritical || searchIndications || searchContraindications || searchAdverse || searchPresentation) && (
                        <button
                          onClick={handleClearFilters}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-500 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Limpiar Filtros</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* General search prompt */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3 relative">
                      <input
                        type="text"
                        placeholder="Buscar por fármaco genérico, nombre comercial o formulación... (ej: Amchafibrin, Heparina)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full text-sm pl-11 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-lg outline-none transition-all placeholder:text-slate-400 font-medium"
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    </div>

                    <button
                      onClick={() => setOnlyCritical(!onlyCritical)}
                      className={`flex items-center justify-center gap-2 py-2.5 px-4 border text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        onlyCritical
                          ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                          : "bg-white text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <AlertTriangle className={`w-3.5 h-3.5 ${onlyCritical ? "text-red-600" : "text-slate-400"}`} />
                      <span>Solo Alerta Crítica</span>
                    </button>
                  </div>

                  {/* Expanded Advanced Filters Panel */}
                  {showAdvancedSearch && (
                    <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in slide-in-from-top-2 duration-200">
                      
                      {/* Filter 1: Indicaciones */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                          Indicación Diagnóstica:
                        </label>
                        <input
                          type="text"
                          placeholder="ej: convulsión, arritmia"
                          value={searchIndications}
                          onChange={(e) => setSearchIndications(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-md outline-none"
                        />
                      </div>

                      {/* Filter 2: Contraindicaciones */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                          Contraindicado en:
                        </label>
                        <input
                          type="text"
                          placeholder="ej: embarazo, asma, renal"
                          value={searchContraindications}
                          onChange={(e) => setSearchContraindications(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-md outline-none"
                        />
                      </div>

                      {/* Filter 3: Efectos Adversos */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                          Reacciones Adversas:
                        </label>
                        <input
                          type="text"
                          placeholder="ej: hipotensión, cefalea"
                          value={searchAdverse}
                          onChange={(e) => setSearchAdverse(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-md outline-none"
                        />
                      </div>

                      {/* Filter 4: Presentación */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                          Presentación Física:
                        </label>
                        <input
                          type="text"
                          placeholder="ej: comp, ampolla, parche"
                          value={searchPresentation}
                          onChange={(e) => setSearchPresentation(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-md outline-none"
                        />
                      </div>

                    </div>
                  )}

                </div>

                {/* ACTIVE CHARACTERIZATION CATEGORIES */}
                <div className="print:hidden">
                  <CategoryList
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                  />
                </div>

                {/* FILTERS STATUS BAR BAR */}
                {(selectedCategory || onlyCritical || searchQuery || searchIndications || searchContraindications || searchAdverse || searchPresentation) && (
                  <div className="flex items-center gap-2 text-xs flex-wrap bg-slate-100 p-3 rounded-lg border border-slate-200 print:hidden justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-500">Criterios Activos:</span>
                      
                      {selectedCategory && (
                        <span className="inline-flex items-center gap-1 py-0.5 px-2 bg-blue-100 text-blue-700 font-bold rounded">
                          Clase: {selectedCategory}
                          <button onClick={() => setSelectedCategory(null)} className="hover:text-red-600 ml-1">×</button>
                        </span>
                      )}

                      {onlyCritical && (
                        <span className="inline-flex items-center gap-1 py-0.5 px-2 bg-red-100 text-red-700 font-bold rounded">
                          Riesgo Crítico
                          <button onClick={() => setOnlyCritical(false)} className="hover:text-red-600 ml-1">×</button>
                        </span>
                      )}

                      {searchQuery && (
                        <span className="inline-flex items-center gap-1 py-0.5 px-2 bg-slate-200 text-slate-700 font-bold rounded">
                          Búsqueda: "{searchQuery}"
                          <button onClick={() => setSearchQuery("")} className="hover:text-red-600 ml-1">×</button>
                        </span>
                      )}

                      {searchIndications && (
                        <span className="inline-flex items-center gap-1 py-0.5 px-2 bg-slate-200 text-slate-700 font-bold rounded">
                          Indicación: "{searchIndications}"
                          <button onClick={() => setSearchIndications("")} className="hover:text-red-600 ml-1">×</button>
                        </span>
                      )}

                      {searchContraindications && (
                        <span className="inline-flex items-center gap-1 py-0.5 px-2 bg-slate-200 text-slate-700 font-bold rounded">
                          Contraind: "{searchContraindications}"
                          <button onClick={() => setSearchContraindications("")} className="hover:text-red-600 ml-1">×</button>
                        </span>
                      )}

                      {searchAdverse && (
                        <span className="inline-flex items-center gap-1 py-0.5 px-2 bg-slate-200 text-slate-700 font-bold rounded">
                          Adverso: "{searchAdverse}"
                          <button onClick={() => setSearchAdverse("")} className="hover:text-red-600 ml-1">×</button>
                        </span>
                      )}

                      {searchPresentation && (
                        <span className="inline-flex items-center gap-1 py-0.5 px-2 bg-slate-200 text-slate-700 font-bold rounded">
                          Formato: "{searchPresentation}"
                          <button onClick={() => setSearchPresentation("")} className="hover:text-red-600 ml-1">×</button>
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={handleClearFilters}
                      className="text-blue-600 hover:underline font-bold text-[11px]"
                    >
                      Remover Todos
                    </button>
                  </div>
                )}

                {/* RESULTS GRID LAYOUT */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider block">
                      Directorio General de Principios Activos ({filteredMedicines.length} Coincidencias)
                    </h3>
                  </div>

                  {filteredMedicines.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-500 max-w-xl mx-auto space-y-3 shadow-3xs">
                      <Layers className="w-10 h-10 text-slate-300 mx-auto" />
                      <p className="font-bold text-slate-700">Ningún medicamento coincide con su criterio.</p>
                      <p className="text-xs text-slate-400">
                        Intente simplificar las palabras de búsqueda o desactivando el filtro avanzado para ver la lista completa.
                      </p>
                      <button
                        onClick={handleClearFilters}
                        className="mt-2 text-blue-600 bg-blue-50 hover:bg-blue-100 font-bold text-xs py-2 px-4 rounded-lg cursor-pointer inline-block"
                      >
                        Resetear Buscador
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
                      {filteredMedicines.map((m) => (
                        <MedicineCard
                          key={m.id}
                          medicine={m}
                          onSelect={setSelectedMedicine}
                          onAddToCompare={handleAddToCompare}
                          isAddedToCompare={compareList.some(item => item.id === m.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

        {/* ==================== TAB 2: INTERACTION ANALYZER ==================== */}
        {activeTab === "checker" && (
          <div className="animate-in fade-in duration-200">
            <InteractionChecker
              selectedMedicines={compareList}
              onRemoveMedicine={handleAddToCompare}
              onAddMedicine={handleAddToCompare}
              onClearAll={handleClearCompare}
            />
          </div>
        )}

      </main>

      {/* STICKY FOOTER & MEDICAL DISCLAIMER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-10 print:hidden mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <span className="font-mono text-white text-xs tracking-widest font-black uppercase block">CONCEPTO ACADÉMICO</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Este Vademécum representa un recopilatorio digitalizado de 30 fármacos críticos basados en el inventario provisto en el archivo medicinal anexo (medicamentos.csv). Es una herramienta consultiva e interactiva.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-white text-xs tracking-widest font-black uppercase block">INTELIGENCIA ARTIFICIAL</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                La función "Consultar Motor IA (Gemini)" ofrece mecanismos avanzados procesados dinámicamente por la IA de Google Gemini para evaluar incompatibilidades potenciales complejas no listadas originalmente.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-white text-xs tracking-widest font-black uppercase block">DESCARGO DE RESPONSABILIDAD</span>
              <p className="text-xs text-slate-350 leading-relaxed bg-amber-950/20 text-slate-300 p-3 rounded-lg border border-amber-900/30">
                ⚠️ **Exención Informativa:** Los datos en esta web son para fines educativos y referencia clínica inicial. No suplantan el criterio de un médico o especialista habilitado.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-sans">
            <div>
              © 2026 Vademécum Farmacéutico Avanzado. Todos los derechos reservados.
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Manual de Usuario</a>
              <span className="text-slate-700">|</span>
              <a href="#" className="hover:text-white transition-colors">Seguridad de Datos</a>
              <span className="text-slate-700">|</span>
              <span>Última revisión: Mayo 2026</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
