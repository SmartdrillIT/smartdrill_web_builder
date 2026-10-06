"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Battery, Zap, ScanFace, FileCode2 } from "lucide-react";

import PhoneModel from "./PhoneModel";
import InfoLabel from "./InfoLabel";

gsap.registerPlugin(ScrollTrigger);

export default function PhoneShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // 1. Añadimos un ref para el contenedor que hace el efecto "sticky"
  const contentRef = useRef<HTMLDivElement>(null); 
  const [isDestroyed, setIsDestroyed] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // 2. ANIMACIÓN DE ENTRADA (Fade in)
    gsap.to(contentRef.current, { 
      opacity: 1, 
      duration: 1.5, 
      ease: "power2.inOut" 
    });

    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 768px)",
      isDesktop: "(min-width: 769px)"
    }, (context) => {
      // @ts-expect-error gsap MatchMedia no tipa `conditions`
      const { isMobile } = context.conditions;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, 
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setIsDestroyed(self.progress >= 0.9);
          },
        },
        defaults: { duration: 1, ease: "power2.inOut" },
      });

      // 3. ANIMACIÓN 3D OPTIMIZADA
      tl.fromTo(".phone-pivot",
        { rotateY: -30, rotateX: 45, rotateZ: -10, scale: isMobile ? 0.8 : 0.9 },
        { rotateY: 40, rotateX: 5, rotateZ: 0, scale: isMobile ? 0.9 : 1.1, duration: 3 }
      )
      // Explosión de capas
      .fromTo(".layer-screen", { translateZ: "1.25rem" }, { translateZ: isMobile ? "9.375rem" : "17.5rem", rotateX: -5 }, "<")
      .fromTo(".layer-board", { translateZ: "0.625rem" }, { translateZ: isMobile ? "6.25rem" : "11.25rem", translateX: isMobile ? "-2.5rem" : "-4.375rem", translateY: "-2.5rem", rotateZ: -15 }, "<")
      .fromTo(".layer-battery", { translateZ: "0.3125rem" }, { translateZ: isMobile ? "4.375rem" : "8.125rem", translateX: isMobile ? "2.5rem" : "3.75rem", rotateZ: 10 }, "<")
      .fromTo(".layer-back", { translateZ: "-1.25rem" }, { translateZ: isMobile ? "-6.25rem" : "-11.25rem" }, "<")
      
      // 4. EFECTO DE PANTALLA
      .to(".lock-screen", { opacity: 0, scale: 1.05, duration: 0.5 }, "<+=0.1")
      .fromTo(".home-screen", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "<")

      // 5. ENTRADA DE ETIQUETAS
      tl.fromTo(".label-container", 
        { opacity: 0, scale: 0.8, y: 20 }, 
        { opacity: 1, scale: isMobile ? 0.65 : 1, y: 0, stagger: 0.1, duration: 1.5, ease: "back.out(1.4)" }, 
        1.5 
      );
    });

    return () => mm.revert();
  }, []);

  return (
    // CAMBIO AQUÍ: Agregamos dark:bg-[#050505] y dark:text-[#f0f0f0]
    <div ref={sectionRef} className="relative h-[600vh] bg-white text-gray-900 overflow-clip font-sans transition-colors duration-300 w-full max-w-full">
      {/* Fuentes Syncopate/Space Mono: cargadas globalmente vía next/font en el layout */}

      {/* 6. Contenedor Sticky */}
      <div 
        ref={contentRef} 
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden opacity-0" 
        style={{ perspective: "2000px" }}
      >
        
        {/* FONDO: SERVICIO TÉCNICO (decorativo, oculto a lectores de pantalla) */}
        <div aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-5 flex flex-col justify-between py-10">
          <div className="font-display font-bold text-[12vw] text-center" 
              style={{ color: isDestroyed ? "#EF4444" : "inherit", transition: "color 0.3s ease" }}>SERVICIO</div>
          <div className="font-display font-bold text-[12vw] text-center"
              style={{ color: isDestroyed ? "#EF4444" : "inherit", transition: "color 0.3s ease" }}>TÉCNICO</div>
        </div>

        {/* CONTENEDOR TELÉFONO */}
        <div className="relative z-10 w-[70vw] md:w-[50vw] max-w-[20rem] aspect-[9/18] will-change-transform">
          <PhoneModel isDestroyed={isDestroyed} p={0} />

          {/* ETIQUETAS */}
          <div className="label-container opacity-0 absolute top-[-5%] left-[2%] md:-left-[100%]">
            <InfoLabel align="left" icon={<ScanFace size="1.5rem" />} title="PANTALLAS" subtitle="Cambio de displays." tech="OLED/IPS" quality="A+" />
          </div>
          <div className="label-container opacity-0 absolute top-[35%] left-0 md:-left-[110%]">
            <InfoLabel align="left" icon={<Zap size="1.5rem" />} title="PLACAS" subtitle="Reparación micro." tech="SMD" quality="PRO" />
          </div>
          <div className="label-container opacity-0 absolute bottom-[5%] left-[2%] md:-left-[100%]">
            <InfoLabel align="left" icon={<FileCode2 size="1.5rem" />} title="DATOS" subtitle="Memorias/Cuentas" tech="NAND" quality="SECURE" />
          </div>

          <div className="label-container opacity-0 absolute top-[15%] right-[2%] md:-right-[100%]">
            <InfoLabel align="right" icon={<Battery size="1.5rem" />} title="BATERÍAS" subtitle="Original/OEM" tech="Li-ion" quality="MAX" />
          </div>
          <div className="label-container opacity-0 absolute top-[55%] right-0 md:-right-[110%]">
            <InfoLabel align="right" icon={<Cpu size="1.5rem" />} title="REBALLING" subtitle="BGA High Tech." tech="LAB" quality="IC" />
          </div>
          <div className="label-container opacity-0 absolute bottom-[-5%] right-[2%] md:-right-[100%]">
            <InfoLabel align="right" icon={<Zap size="1.5rem" />} title="SOFTWARE" subtitle="Soporte avanzado." tech="OS" quality="FIX" />
          </div>
        </div>
      </div>
    </div>
  );
}