"use client";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import OpenStatusBadge from "@/components/layout/OpenStatusBadge";

export default function LocationSection() {
  const { t } = useLanguage();
  const content = t("location");
  const intro = t("locationIntro");

  return (
    <section className="relative z-40 bg-[#f5f5f7] dark:bg-black border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-500 py-24 md:py-32 overflow-hidden">
      
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header estilo Cupertino */}
        <header className="mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-4"
          >
            <div className="p-2 bg-blue-600/10 rounded-lg">
              <MapPin size="1.25rem" />
            </div>
            <span className="text-sm font-bold uppercase tracking-[0.2em]">{content.title}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-tight"
          >
            {intro.a} <br className="hidden md:block" />
            {intro.b}
          </motion.h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Tarjeta de Información Estilo "Bento" */}
          <motion.div 
            className="flex flex-col justify-between p-10 md:p-12 bg-white dark:bg-[#161617] border border-zinc-200 dark:border-white/5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-none"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-12">
              {/* Dirección */}
              <div className="group">
                <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-4">{content.baseTitle}</h3>
                <p className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight leading-snug">
                  <span className="text-blue-600 dark:text-blue-500">{content.addressCode}</span><br/>
                  {content.addressStreet}<br/>
                  <span className="text-zinc-400 dark:text-zinc-500">{content.addressCity}</span>
                </p>
              </div>

              {/* Horarios Estilo Widget de iOS */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock size="1rem" className="text-blue-600" />
                    <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">{content.scheduleTitle}</h3>
                  </div>
                  <OpenStatusBadge />
                </div>
                <div className="space-y-4 max-w-sm">
                  {[
                    { day: content.days.week, time: "09:00 — 18:00" },
                    { day: content.days.saturday, time: "10:00 — 14:00" },
                    { day: content.days.sunday, time: content.status.closed, closed: true }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center group">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">{row.day}</span>
                      <span className={`font-bold tracking-tight ${row.closed ? 'text-zinc-300 dark:text-zinc-700 italic' : 'text-zinc-900 dark:text-white'}`}>
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Botón Estilo Pro */}
            <div className="pt-12">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=-0.268841,-78.527817" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-zinc-900 dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold text-sm hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all group"
              >
                {content.cta} 
                <ArrowRight size="1.125rem" className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Mapa con Estilo Cinematográfico */}
          <motion.div 
            className="w-full h-[31.25rem] lg:h-auto rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-white/5 relative group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <iframe 
              src={`https://maps.google.com/maps?q=-0.268841,-78.527817&hl=es&z=17&output=embed`} 
              title="Mapa de ubicación Smart Drill"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.4] dark:invert dark:grayscale-[0.9] dark:contrast-[1.1] transition-all duration-1000 group-hover:grayscale-0 dark:group-hover:grayscale-[0.2]"
            />
            
            {/* Overlay sutil para suavizar bordes del mapa */}
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-[2.5rem]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}