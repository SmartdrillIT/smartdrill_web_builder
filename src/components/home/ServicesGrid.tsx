'use client';

import { Smartphone, Laptop, Zap, Lock, FileSearch, ShieldCheck, ArrowRight, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// Importamos el ServiceCard si está en otro archivo,
// pero aquí te dejo la lógica visual para que coincida.
export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export default function ServicesGrid() {
  const { t } = useLanguage();
  const content = t("servicesGrid");
  const icons = [Smartphone, Laptop, Zap, Lock, FileSearch, ShieldCheck];

  const SERVICES: ServiceItem[] = content.items.map((item: { title: string; desc: string }, index: number) => ({
    ...item,
    icon: icons[index],
  }));

  return (
    <section className="relative w-full py-16 md:py-32 bg-[#f5f5f7] dark:bg-[#000] overflow-hidden transition-colors duration-500">
      
      {/* 1. Fondo con Gradiente Atmosférico (Estilo Apple Pro) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-blue-400/5 dark:bg-blue-400/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Header Rediseñado */}
        <div className="mb-10 md:mb-20 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-500/20 border border-blue-600/10 dark:border-blue-500/20 mb-6"
          >
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
              {content.badge}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4 md:mb-8 leading-[1.05]"
          >
            {content.title}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl"
          >
            {content.description}
          </motion.p>
        </div>

        {/* En móvil: tarjetas apiladas a ancho completo. Carrusel solo si cabe. */}
        <div className="
          grid grid-cols-1 gap-4
          md:grid-cols-2 md:gap-8 lg:grid-cols-3 md:px-0 md:mx-0
        ">
          {SERVICES.map((s, i) => (
            <motion.div 
              key={s.title} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-0"
            >
              <div className="group relative h-full p-6 sm:p-10 bg-white dark:bg-[#161617] border border-zinc-200/50 dark:border-white/5 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
                
                {/* Icono con Azul Apple */}
                <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500">
                  <s.icon size="1.75rem" strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
                  {s.title}
                </h3>
                
                <p className="text-[1rem] leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium mb-10">
                  {s.desc}
                </p>

                {/* Call to action sutil */}
                <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 group/link">
                  <span>{content.more}</span>
                  <ArrowRight size="1rem" className="transition-transform group-hover/link:translate-x-1" />
                </div>

                {/* Reflejo de luz al pasar el mouse */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}