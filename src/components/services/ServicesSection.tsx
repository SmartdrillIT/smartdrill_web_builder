'use client';

import React from "react";
import { motion } from "framer-motion";
import { PenTool, CheckCircle2, ChevronRight, Search } from "lucide-react";
import { SERVICES_DATA } from "./services-data";
import { useLanguage } from "@/context/LanguageContext";
import ServiceCard from "./ServiceCard";
import ProcessCard from "./ProcessCard";
import { WHATSAPP_DIRECT_NUMBER } from "@/lib/config";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function ServicesPagePremium() {
  const { t, language } = useLanguage();
  const content = t("servicesPage");

  const services = SERVICES_DATA.map((s, i) => ({ ...s, ...content.services[i] }));
  const processIcons = [
    <Search key="0" size="2.5rem" className="text-blue-500" />,
    <PenTool key="1" size="2.5rem" className="text-blue-500" />,
    <CheckCircle2 key="2" size="2.5rem" className="text-blue-500" />,
  ];

  // Función para scroll suave
  const scrollToServices = () => {
    const element = document.getElementById('servicios');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Función para WhatsApp
  const contactWhatsApp = () => {
    window.open(buildWhatsAppLink(WHATSAPP_DIRECT_NUMBER), "_blank");
  };

  return (
    <div className="bg-[#f5f5f7] dark:bg-black min-h-screen font-sans transition-colors duration-500 selection:bg-blue-500/30">

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center z-10 max-w-4xl"
        >
          <h2 className="text-blue-600 dark:text-blue-500 font-semibold tracking-widest uppercase text-xs md:text-sm mb-6">
            {content.kicker}
          </h2>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-zinc-900 tracking-tighter leading-[0.9] break-words">
            {content.titleA} <br />
            <span className="text-zinc-400 dark:text-zinc-600">{content.titleB}</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
            {content.desc}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            {/* BOTÓN CONECTADO AL SCROLL */}
            <button
              onClick={scrollToServices}
              className="bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full px-8 py-4 font-semibold text-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
            >
              {content.cta} <ChevronRight size="1.25rem" />
            </button>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-[#f5f5f7] to-[#f5f5f7] dark:from-blue-900/20 dark:via-black dark:to-black z-0 pointer-events-none" />
      </section>

      {/* 2. FILOSOFÍA */}
      <section className="py-32 px-6 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-zinc-900 dark:text-white"
          >
            {content.philosophyA} <span className="text-blue-600">{content.philosophyB}</span>.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
            {content.philosophy.map((item: { title: string; text: string }, i: number) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="border-t border-zinc-200 dark:border-zinc-800 pt-6"
              >
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID (Añadido ID "servicios") */}
      <section id="servicios" className="py-32 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{content.gridTitle}</h2>
          <p className="text-xl text-zinc-500">{content.gridDesc}</p>
        </div>

        <motion.div
          // Al cambiar de idioma las cards se remontan (key por título traducido).
          // Sin esta key, el contenedor no repetía su whileInView (once: true ya
          // consumido) y las cards nuevas quedaban atoradas en opacity 0.
          key={language}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[20rem]"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </motion.div>
      </section>

      {/* 4. EL PROCESO */}
      <section className="py-24 md:py-32 px-6 bg-zinc-100 text-zinc-900 border-y border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{content.processTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.process.map((p: { title: string; desc: string }, i: number) => (
              <ProcessCard
                key={p.title}
                icon={processIcons[i]}
                step={i === 0 ? "01" : i === 1 ? "02" : "03"}
                title={p.title}
                desc={p.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION FINAL */}
      <section className="py-40 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            {content.ctaTitle}
          </h2>
          <p className="text-2xl text-zinc-500 mb-12 font-medium">
            {content.ctaDesc}
          </p>
          {/* BOTÓN WHATSAPP CONECTADO */}
          <button
            onClick={contactWhatsApp}
            className="bg-blue-600 text-white rounded-full px-10 py-5 font-bold text-xl hover:bg-blue-700 transition-colors shadow-2xl shadow-blue-500/20"
          >
            {content.ctaButton}
          </button>
        </motion.div>
      </section>

    </div>
  );
}
