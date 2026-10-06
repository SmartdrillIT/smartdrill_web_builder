'use client';

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import anime from "animejs";
import { Search, ChevronRight, X, ArrowLeft } from "lucide-react";
import { BRANDS_DATA, MODELS } from "@/lib/catalog";
import type { PhoneModel } from "@/types/catalog";
import RepairModal from "@/components/repair/RepairModal";
import { useBodyScrollLock } from "@/hooks/useUi";
import { useLanguage } from "@/context/LanguageContext";

export default function BrandsSectionPremium() {
  const { t } = useLanguage();
  const content = t("brands");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeModel, setActiveModel] = useState<PhoneModel | null>(null);

  const brandsGridRef = useRef<HTMLDivElement>(null);
  const modelsListRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(activeModel !== null);

  useEffect(() => {
    if (!selectedBrand && brandsGridRef.current) {
      anime({
        targets: brandsGridRef.current.children,
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(40, { start: 100 }),
        easing: 'easeOutElastic(1, .8)',
        duration: 800
      });
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedBrand && modelsListRef.current) {
      anime({
        targets: '.model-card-animate',
        translateX: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(30),
        easing: 'easeOutQuad',
        duration: 500
      });
    }
  }, [selectedBrand, search]);

  const currentBrandData = useMemo(() => {
    return BRANDS_DATA.find(b => b.name === selectedBrand);
  }, [selectedBrand]);

  const groupedModels = useMemo(() => {
    if (!selectedBrand || !MODELS[selectedBrand]) return {};
    const term = search.toLowerCase().trim();
    const filtered = MODELS[selectedBrand].filter((m: PhoneModel) =>
      m.name.toLowerCase().includes(term)
    );
    return filtered
      .sort((a: PhoneModel, b: PhoneModel) => b.year - a.year)
      .reduce<Record<number, PhoneModel[]>>((acc, m) => {
        acc[m.year] = acc[m.year] || [];
        acc[m.year].push(m);
        return acc;
      }, {});
  }, [selectedBrand, search]);

  return (
    <section className="bg-white dark:bg-[#0a0a0a] min-h-screen pt-24 md:pt-32 pb-16 px-6 transition-colors duration-500 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">

        {/* --- HEADER PRINCIPAL --- */}
        <AnimatePresence mode="wait">
          {!selectedBrand && (
            <motion.header 
              key="main-header"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="mb-20 text-center max-w-4xl mx-auto"
            >
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[0.9]">
                {content.heroA} <br />
                <span className="text-zinc-400 dark:text-zinc-600">{content.heroB}</span>
              </h1>
            </motion.header>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!selectedBrand ? (
            <motion.div
              key="brands-grid"
              exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
              ref={brandsGridRef}
              className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {BRANDS_DATA.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => { setSelectedBrand(brand.name); setSearch(""); }}
                  className="group relative flex aspect-square min-h-0 w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-zinc-50 dark:bg-[#161616] border border-zinc-200/50 dark:border-zinc-800/50 hover:border-blue-500/30 hover:bg-white dark:hover:bg-[#1c1c1e] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  <span className={`flex h-full w-full items-center justify-center p-6 md:p-7 ${brand.logoClass}`}>
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={160}
                      height={160}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="absolute bottom-6 text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {brand.name}
                  </span>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="models-list"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              className="w-full relative"
              ref={modelsListRef}
            >
              <div className="sticky top-[5rem] z-40 w-full mb-12 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl py-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all -mt-8 px-2 md:px-0">
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button 
                    onClick={() => setSelectedBrand(null)}
                    aria-label="Volver a marcas"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  
                  {currentBrandData && (
                    <div className="flex items-center gap-3">
                      <Image
                        src={currentBrandData.logo}
                        alt={selectedBrand}
                        width={96}
                        height={24}
                        className={`h-6 w-auto object-contain ${currentBrandData.logoClass}`}
                      />
                      <span className="text-xl font-bold text-zinc-900 dark:text-white hidden md:block">
                        {content.available}
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative w-full sm:w-[21.875rem]">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input 
                    type="text" 
                    placeholder={content.search} 
                    aria-label={content.search}
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-full bg-zinc-100 dark:bg-zinc-900 py-2.5 pl-11 pr-10 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium border border-transparent dark:border-zinc-800"
                  />
                  {search && (
                    <button 
                      onClick={() => setSearch("")}
                      aria-label="Limpiar búsqueda"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-16 max-w-5xl mx-auto">
                {Object.keys(groupedModels).sort((a, b) => Number(b) - Number(a)).map((year) => (
                  <div key={year}>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 pl-2">
                      {content.launches} {year}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {groupedModels[Number(year)].map((model) => (
                        <button
                          key={model.name}
                          onClick={() => setActiveModel(model)}
                          className="model-card-animate group flex items-center gap-5 rounded-3xl bg-zinc-50 dark:bg-[#161616] p-4 border border-zinc-200/50 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-[#1c1c1e] hover:border-blue-500/30 hover:shadow-xl transition-all duration-300 text-left"
                        >
                           <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-black p-2 border border-zinc-100 dark:border-zinc-800">
                              <Image src={model.image} alt={model.name} width={80} height={80} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110" />
                           </div>
                          
                          <div className="flex-1">
                             <span className="block text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                               {model.name}
                             </span>
                              <span className="mt-1 flex items-center gap-1 text-sm font-medium text-zinc-500">
                                {content.diagnosis} <ChevronRight className="h-4 w-4" />
                              </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* --- MODAL DE COTIZACIÓN UNIFICADO --- */}
        <RepairModal
          activeModel={
            activeModel && selectedBrand
              ? { ...activeModel, brand: selectedBrand }
              : null
          }
          selectedBrand={selectedBrand}
          onClose={() => setActiveModel(null)}
        />

      </div>
    </section>
  );
}