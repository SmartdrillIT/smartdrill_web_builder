'use client';

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import type { QuoteSentDetail } from "@/lib/whatsapp";

interface IslandState extends QuoteSentDetail {
  isOpen: boolean;
}

/**
 * Isla Dinámica estilo premium: aparece bajo el navbar cuando se envía
 * una cotización (evento `whatsappQuoteSent`) y se oculta a los 8s.
 */
export default function DynamicIsland() {
  const islandRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<IslandState>({
    isOpen: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    const handleNotification = (e: Event) => {
      const detail = (e as CustomEvent<QuoteSentDetail>).detail;
      setState({ isOpen: true, title: detail.title, message: detail.message });

      const isMobile = window.innerWidth < 768;
      // Ancho dinámico: 92% en móvil o 23.75rem en desktop
      const targetWidth = isMobile ? window.innerWidth * 0.92 : "23.75rem";
      // Posición: justo debajo del área del navbar
      const targetTop = isMobile ? "5.3125rem" : "3.75rem";

      // Animación de expansión (gota de pintura)
      gsap.fromTo(
        islandRef.current,
        { width: "5rem", height: "1.25rem", opacity: 0, y: "-1.25rem", borderRadius: "2.5rem" },
        {
          width: targetWidth,
          height: "auto",
          minHeight: "4.375rem",
          opacity: 1,
          y: targetTop,
          duration: 0.8,
          ease: "elastic.out(1, 0.75)",
          display: "flex",
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, delay: 0.3, ease: "power2.out" }
      );

      // Desaparecer después de 8 segundos
      setTimeout(() => {
        gsap.to(contentRef.current, { opacity: 0, duration: 0.3 });
        gsap.to(islandRef.current, {
          width: "5rem",
          height: "1.25rem",
          opacity: 0,
          y: "-1.25rem",
          duration: 0.5,
          ease: "back.in(1.2)",
          onComplete: () => {
            setState((prev) => ({ ...prev, isOpen: false }));
            gsap.set(islandRef.current, { display: "none" });
          },
        });
      }, 8000);
    };

    window.addEventListener("whatsappQuoteSent", handleNotification);
    return () => window.removeEventListener("whatsappQuoteSent", handleNotification);
  }, []);

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[50] pointer-events-none flex justify-center items-start w-full px-4">
      <div
        ref={islandRef}
        className="bg-white text-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-zinc-200 hidden overflow-hidden justify-center items-center py-4 px-5"
        style={{ borderRadius: "2rem" }}
      >
        <div ref={contentRef} className="flex items-center gap-4 w-full opacity-0">
          {/* Icono Verde */}
          <div className="bg-green-500/15 p-2.5 rounded-full shrink-0">
            <CheckCircle2 size="1.375rem" className="text-green-600" strokeWidth={2.5} />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[0.875rem] md:text-[0.9375rem] font-medium text-zinc-900 tracking-tight">
              {state.title}
            </span>
            <span className="text-[0.75rem] md:text-[0.8125rem] text-zinc-500 font-normal leading-tight mt-0.5">
              {state.message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
