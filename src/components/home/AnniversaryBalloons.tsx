"use client"; // Asegúrate de incluir esto si usas Next.js App Router

import Image from "next/image";
import { useEffect, useState } from "react";

export default function AnniversaryBalloons() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // La animación completa dura 6 segundos. Luego, desmontamos el componente para no estorbar.
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Estilos de animación en línea para no modificar tu tailwind.config */}
      <style>{`
        @keyframes flyInOut {
          0% { transform: translateY(120vh) scale(0.8); opacity: 0; }
          15% { transform: translateY(10vh) scale(1); opacity: 1; }
          25% { transform: translateY(0) scale(1); opacity: 1; }
          80% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-120vh) scale(0.8); opacity: 0; }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        .animate-fly-in-out {
          animation: flyInOut 6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .animate-bob-1 {
          animation: bob 3s ease-in-out infinite;
        }
        .animate-bob-2 {
          animation: bob 3s ease-in-out infinite;
          animation-delay: 0.4s;
        }
      `}</style>

      {/* Contenedor principal de los globos */}
      <div className="flex space-x-2 md:space-x-6 animate-fly-in-out mt-10 md:mt-20">
        
        {/* Globo número 2 */}
        <div className="animate-bob-1 relative">
          <Image
            src="/balloon-2.png" // Reemplaza con la ruta de tu imagen 3D real
            alt="Globo 2"
            width={256}
            height={256}
            priority
            className="w-32 sm:w-48 md:w-64 h-auto drop-shadow-2xl"
          />
          {/* Cuerda decorativa (opcional) */}
          <div className="absolute top-[95%] left-1/2 w-[1px] h-32 md:h-48 bg-zinc-300/60 dark:bg-zinc-500/60 -translate-x-1/2 rounded-full"></div>
        </div>

        {/* Globo número 0 */}
        <div className="animate-bob-2 relative mt-4 md:mt-8">
          <Image
            src="/balloon-0.png" // Reemplaza con la ruta de tu imagen 3D real
            alt="Globo 0"
            width={256}
            height={256}
            priority
            className="w-32 sm:w-48 md:w-64 h-auto drop-shadow-2xl"
          />
          {/* Cuerda decorativa (opcional) */}
          <div className="absolute top-[95%] left-1/2 w-[1px] h-32 md:h-48 bg-zinc-300/60 dark:bg-zinc-500/60 -translate-x-1/2 rounded-full"></div>
        </div>
        
      </div>
    </div>
  );
}