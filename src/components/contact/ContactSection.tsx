'use client';
import { useEffect, useRef, type ReactNode } from "react";
import anime from "animejs";
import { Blobatar } from "@blobatar/react";
import { Phone, Mail, MessageCircle, MapPin, ArrowUpRight, Clock, Navigation } from "lucide-react";
import { MAPS_EMBED_SRC, MAPS_LINK } from "@/lib/config";
import { useLanguage } from "@/context/LanguageContext";
import OpenStatusBadge from "@/components/layout/OpenStatusBadge";

interface ContactAction {
  label: string;
  link: string;
  // Semilla estable del avatar: el mismo texto siempre genera la misma cara.
  seed?: string;
}

interface ContactMethod {
  title: string;
  icon: ReactNode;
  desc: string;
  color: string;
  bgIcon: string;
  actions?: ContactAction[];
  value?: string;
  link?: string;
}

export default function ContactSectionPremium() {
  const { t } = useLanguage();
  const content = t("contact");
  const containerRef = useRef(null);

  // Enlace corregido para asegurar que el iframe funcione correctamente
  const mapSrc = MAPS_EMBED_SRC;
  const mapLink = MAPS_LINK;

  useEffect(() => {
    anime({
      targets: '.fade-up-element',
      translateY: [30, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, {start: 200}),
      easing: 'easeOutCubic',
      duration: 800
    });

    anime({
      targets: '.map-container',
      scale: [0.95, 1],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutQuart',
      delay: 600
    });
  }, []);

  const methods: ContactMethod[] = [
    { 
      title: content.whatsappTitle, 
      icon: <MessageCircle className="w-6 h-6" />, 
      desc: content.whatsappDesc, 
      color: "text-green-600 dark:text-green-500",
      bgIcon: "bg-green-100 dark:bg-green-900/30",
      actions: [
        { label: content.soporteA, link: "https://wa.me/593987980898", seed: "smartdrill-soporte-a" },
        { label: content.soporteB, link: "https://wa.me/593987991506", seed: "smartdrill-soporte-b" }
      ] 
    },
    { 
      title: content.llamadaTitle, 
      icon: <Phone className="w-6 h-6" />, 
      desc: content.llamadaDesc, 
      color: "text-blue-600 dark:text-blue-500",
      bgIcon: "bg-blue-100 dark:bg-blue-900/30",
      actions: [{label: content.linea1, link: "tel:+593987980898"}, {label: content.linea2, link: "tel:+593987991506"}] 
    },
    { 
      title: content.correoTitle, 
      icon: <Mail className="w-6 h-6" />, 
      desc: content.correoDesc, 
      color: "text-zinc-900 dark:text-white",
      bgIcon: "bg-zinc-100 dark:bg-zinc-800",
      value: "soporte@smartdrill.net", 
      link: "mailto:soporte@smartdrill.net" 
    },
    { 
      title: content.ubiTitle, 
      icon: <MapPin className="w-6 h-6" />, 
      desc: content.ubiDesc, 
      color: "text-red-600 dark:text-red-500",
      bgIcon: "bg-red-100 dark:bg-red-900/30",
      value: content.verMapa, 
      link: mapLink 
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#f5f5f7] dark:bg-[#000000] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 font-sans selection:bg-blue-500/30">
      
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        {/* --- HEADER --- */}
        <div className="max-w-3xl mb-16 fade-up-element text-center md:text-left mx-auto md:mx-0">
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            {content.titleA} <br className="hidden md:block" />
            {content.titleB}
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium">
            {content.desc}
          </p>
        </div>

        {/* --- GRID DE MÉTODOS DE CONTACTO --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {methods.map((m, i) => (
            <div 
              key={i}
              className="fade-up-element group flex flex-col justify-between p-8 bg-white dark:bg-[#161616] border border-zinc-200/60 dark:border-zinc-800/60 rounded-[2rem] transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-105 ${m.bgIcon} ${m.color}`}>
                  {m.icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-white">{m.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">{m.desc}</p>
              </div>
              
              <div className="space-y-2 mt-auto">
                {m.actions ? (
                    <div className="flex flex-col gap-2">
                      {m.actions.map((act, j) => (
                        <a 
                          key={j} 
                          href={act.link} 
                          className="flex items-center justify-center gap-2 py-3 px-3 text-sm font-semibold bg-zinc-100 dark:bg-[#222] text-zinc-900 dark:text-white rounded-xl hover:bg-zinc-200 dark:hover:bg-[#333] transition-colors"
                        >
                          {act.seed && (
                            <Blobatar
                              name={act.seed}
                              size={26}
                              animate="hover"
                              title={act.label}
                              className="shrink-0"
                            />
                          )}
                          {act.label}
                        </a>
                      ))}
                    </div>
                ) : (
                  <a 
                    href={m.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between p-4 bg-zinc-100 dark:bg-[#222] rounded-xl text-sm font-semibold group/btn hover:bg-zinc-200 dark:hover:bg-[#333] transition-colors text-zinc-900 dark:text-white"
                  >
                    <span className="truncate">{m.value}</span>
                    <ArrowUpRight size="1.125rem" className="text-zinc-400 group-hover/btn:text-zinc-900 dark:group-hover/btn:text-white transition-colors" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* --- MAPA Y HORARIOS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Mapa */}
          <div className="map-container lg:col-span-2 h-[25rem] md:h-[31.25rem] rounded-[2.5rem] overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 relative bg-zinc-100 dark:bg-[#161616]">
            <iframe 
               src={mapSrc} 
               title="Mapa de ubicación Smart Drill"
               width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
               className="grayscale-[0.3] dark:invert dark:grayscale-[0.8] opacity-80 transition-opacity duration-500 hover:opacity-100"
            />
            
            <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 p-4 md:p-6 bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-zinc-700/50 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Dirección Principal</p>
                  <p className="font-bold text-lg text-zinc-900 dark:text-white tracking-tight">S15-190 P.V. Maldonado</p>
                </div>
                <a 
                  href={mapLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 px-6 py-3 rounded-full text-white font-semibold text-sm hover:bg-blue-700 active:scale-95 transition-all"
                >
                  <Navigation size="1rem" /> Cómo llegar
                </a>
            </div>
          </div>

          {/* Tarjeta de Horarios estilo Widget iOS */}
          <div className="fade-up-element bg-white text-zinc-900 p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between shadow-xl border border-zinc-200/70 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
             
             <div className="relative z-10">
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 text-white">
                  <Clock size="1.5rem" />
                </div>
                <h4 className="text-3xl font-bold tracking-tight mb-4 leading-none">
                  Horario de <br/>Atención.
                </h4>
                <div className="mb-8">
                  <OpenStatusBadge className="bg-zinc-100 dark:bg-[#222] border-transparent" />
                </div>
                
                <div className="space-y-5">
                  {[
                    { label: "Lunes a Viernes", time: "09:00 - 18:00" },
                    { label: "Sábados", time: "10:00 - 14:00" }
                  ].map((h, i) => (
                    <div key={i} className="flex flex-col gap-1 border-b border-zinc-200 pb-4">
                      <span className="text-sm font-medium text-zinc-500">{h.label}</span>
                      <span className="font-semibold text-xl tracking-tight">{h.time}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 opacity-70">
                    <span className="text-sm font-medium">Domingo</span>
                    <span className="font-semibold text-sm bg-zinc-100 px-3 py-1 rounded-full">Cerrado</span>
                  </div>
                </div>
             </div>
             
          </div>
        </div>
      </section>
    </div>
  );
}