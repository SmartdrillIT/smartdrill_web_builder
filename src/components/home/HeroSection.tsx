"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  X,
  Search,
  Smartphone,
  Cpu,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

import { MODELS } from "@/lib/catalog";
import RepairModal from "@/components/repair/RepairModal";
import type { ModelWithBrand, PhoneModel } from "@/types/catalog";
import { useClickOutside } from "@/hooks/useUi";
import { useLanguage } from "@/context/LanguageContext";

interface SearchResult {
  id: string;
  type: 'service' | 'model';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  href?: string;
  rawModel?: ModelWithBrand;
}

export default function TechCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeModel, setActiveModel] = useState<ModelWithBrand | null>(null);
  const [hideOnFooter, setHideOnFooter] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { t } = useLanguage();
  const navLinks = t("navbar").links;
  const palette = t("palette");

  useClickOutside(containerRef, isOpen, () => setIsOpen(false));

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.innerHeight + window.scrollY;

      if (!isOpen) {
        setHideOnFooter(currentScroll > scrollHeight - 150);
      } else {
        setHideOnFooter(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const filteredResults: SearchResult[] = useMemo(() => {
    const term = inputValue.toLowerCase().trim();
    if (term === "") {
      return [
        {
          id: 's1', type: 'service', title: navLinks.services,
          subtitle: palette.s1desc, icon: <Cpu size="1rem" className="md:w-[1.125rem] md:h-[1.125rem]" />,
          color: 'bg-purple-500/20 text-purple-400', href: '/servicios'
        },
        {
          id: 's2', type: 'service', title: navLinks.brands,
          subtitle: palette.s2desc, icon: <ShieldCheck size="1rem" className="md:w-[1.125rem] md:h-[1.125rem]" />,
          color: 'bg-emerald-500/20 text-emerald-400', href: '/marcas'
        }
      ];
    }
    const results: SearchResult[] = [];
    Object.entries(MODELS).forEach(([brand, models]) => {
      (models as PhoneModel[]).forEach((model) => {
        if (model.name.toLowerCase().includes(term) || brand.toLowerCase().includes(term)) {
          results.push({
            id: `${brand}-${model.name}`,
            type: 'model',
            title: model.name,
            subtitle: `${brand} • ${model.year}`,
            icon: <Smartphone size="1rem" className="md:w-[1.125rem] md:h-[1.125rem]" />,
            color: 'bg-blue-500/20 text-blue-400',
            rawModel: { ...model, brand }
          });
        }
      });
    });
    return results.slice(0, 8);
  }, [inputValue, navLinks, palette]);

  return (
    <>
      <motion.div
        ref={containerRef}
        initial={false}
        animate={hideOnFooter ? "hidden" : isOpen ? "open" : "visible"}
        variants={{
          hidden: {
            // Ancho matemático: 3rem del interior + 0.75rem de padding (p-1.5) = 3.75rem. Círculo perfecto.
            width: "3.75rem",
            scale: 0,
            opacity: 0,
            y: "1.25rem",
            transition: {
              width: { duration: 0.3, ease: "easeInOut" },
              scale: { duration: 0.3, delay: 0.3, ease: "backIn" },
              opacity: { duration: 0.2, delay: 0.4 },
              y: { duration: 0.3, delay: 0.3 }
            }
          },
          visible: {
            width: "100%",
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
              scale: { duration: 0.4, ease: "backOut" },
              opacity: { duration: 0.2 },
              y: { duration: 0.4 },
              width: { duration: 0.5, delay: 0.3, type: "spring", stiffness: 200, damping: 25 }
            }
          },
          open: {
            width: "100%",
            scale: 1,
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 }
          }
        }}
        className={`fixed left-1/2 -translate-x-1/2 z-[90] max-w-[92%] md:max-w-2xl w-full font-sans flex justify-center ${
          isOpen ? "top-[8%] bottom-auto md:top-auto md:bottom-10" : "bottom-4 md:bottom-10"
        }`}
      >
        <div className="relative group w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-orange-600/20 rounded-[2rem] md:rounded-[2.6rem] blur-xl md:blur-2xl opacity-40 group-hover:opacity-70 transition duration-1000"></div>

          <motion.div
            className="relative w-full bg-white/95 backdrop-blur-[30px] rounded-[2rem] md:rounded-[2.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.12)] border border-zinc-200 overflow-hidden"
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-b border-zinc-100"
                >
                  <div className="p-4 md:p-6 pb-2 flex justify-between items-center">
                    <h2 className="text-[0.75rem] font-black uppercase tracking-[0.2em] text-zinc-500">
                      Smart Drill • {inputValue ? palette.results : palette.suggested}
                    </h2>
                    <button onClick={() => setIsOpen(false)} aria-label={palette.close} className="p-2.5 md:p-2 -m-1 text-zinc-500 hover:text-zinc-900 transition-colors">
                      <X size="1rem" className="md:w-[1.125rem] md:h-[1.125rem]"/>
                    </button>
                  </div>

                  <div className="p-2 md:p-4 pt-0 max-h-[18.75rem] md:max-h-[21.875rem] overflow-y-auto scrollbar-hide">
                    {filteredResults.map((result) => (
                      <div
                        key={result.id}
                        onClick={() => {
                          if (result.type === 'service' && result.href) {
                            router.push(result.href);
                          } else if (result.rawModel) {
                            setActiveModel(result.rawModel);
                          }
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-between p-3 md:p-4 hover:bg-zinc-100 rounded-[1.5rem] md:rounded-[2rem] cursor-pointer group/item transition-all mb-1 md:mb-1.5 border border-transparent hover:border-zinc-200"
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className={`p-2 md:p-3 rounded-xl md:rounded-2xl ${result.color} backdrop-blur-md shadow-inner`}>
                            {result.icon}
                          </div>
                          <div>
                            <h3 className="text-sm md:text-sm font-bold text-zinc-900">{result.title}</h3>
                            <p className="text-xs md:text-[0.75rem] text-zinc-500 font-medium">{result.subtitle}</p>
                          </div>
                        </div>
                        <ChevronRight size="0.875rem" className="md:w-[1rem] md:h-[1rem] text-zinc-600 group-hover/item:text-orange-500 transition-all" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SECCIÓN REESTRUCTURADA: Garantiza el centrado perfecto del icono */}
            <div className="p-1.5">
              <div className={`flex items-center justify-center bg-zinc-100 rounded-[1.4rem] md:rounded-[1.8rem] border transition-all duration-500 w-full overflow-hidden ${isOpen ? 'border-orange-500/40 bg-orange-50' : 'border-zinc-200/70'}`}>
                
                {/* 1. Contenedor de la Lupa (Caja Fija). Siempre mide 3rem */}
                <div className="w-[3rem] h-[3rem] flex items-center justify-center shrink-0 text-zinc-500">
                  <Search size="1.125rem" className={`md:w-5 md:h-5 ${isOpen ? "text-orange-500" : ""}`} />
                </div>
                
                {/* 2. Contenedor del Input (Elástico). Al encogerse el padre a 3.75rem, este div pasa a medir 0 exactos ocultando el input y sus márgenes */}
                <div className="flex-1 overflow-hidden h-full flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode="search"
                    enterKeyHint="search"
                    autoComplete="off"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    placeholder={palette.searchPlaceholder}
                    aria-label={palette.searchPlaceholder}
                    className="w-full bg-transparent border-none outline-none text-base md:text-[0.9375rem] text-zinc-900 py-3 pr-4 font-semibold placeholder:text-zinc-400 placeholder:text-ellipsis whitespace-nowrap"
                  />
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <RepairModal
        activeModel={activeModel}
        selectedBrand={activeModel?.brand ?? null}
        onClose={() => setActiveModel(null)}
      />
    </>
  );
}