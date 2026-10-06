import { ReactNode } from "react";

interface InfoLabelProps {
  className?: string;
  align: "left" | "right";
  icon: ReactNode;
  title: string;
  subtitle: string;
  tech: string;
  quality?: string;
}

export default function InfoLabel({ className, align, icon, title, subtitle, tech, quality }: InfoLabelProps) {
  const isLeft = align === 'left';
  
  return (
    <div className={`z-50 flex items-center gap-0 w-max group ${className}`}>
      {/* Línea conectora estilo "Hairline" de Apple */}
      <div className={`hidden sm:flex items-center ${isLeft ? 'order-last' : 'order-first'}`}>
        {!isLeft && <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-white z-10" />}
        <div className={`w-12 md:w-20 h-[0.5px] bg-zinc-300 dark:bg-zinc-700 ${
          isLeft ? 'origin-right' : 'origin-left'
        } group-hover:scale-x-110 transition-transform duration-700 ease-out`} />
        {isLeft && <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-white z-10" />}
      </div>

      {/* Tarjeta Principal Estilo Vidrio (Glassmorphism) */}
      <div className="relative group/card transition-all duration-500">
        <div className="
          p-4 rounded-[1.2rem] backdrop-blur-md flex items-center gap-4
          bg-white/70 dark:bg-black/40 
          border border-zinc-200/50 dark:border-white/10 
          shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.4)]
          group-hover:bg-white/90 dark:group-hover:bg-black/60
          transition-all duration-500
        ">
            
            {/* Contenedor del Icono */}
            <div className="relative shrink-0">
              <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl shadow-sm">
                {/* Clonamos el icono para asegurar que el tamaño sea Pro */}
                <div className="w-5 h-5 flex items-center justify-center">
                  {icon}
                </div>
              </div>
            </div>

            <div className="flex flex-col pr-2">
               <h4 className="text-[0.8125rem] font-bold text-zinc-900 dark:text-white tracking-tight leading-none mb-1">
                {title}
               </h4>
               <p className="text-[0.75rem] font-medium text-zinc-500 dark:text-zinc-400 leading-snug mb-2 max-w-[10rem]">
                {subtitle}
               </p>
               
               {/* Badges de especificaciones */}
               <div className="flex items-center gap-1.5">
                 <div className="inline-flex items-center px-2 py-0.5 bg-zinc-200/50 dark:bg-zinc-700/30 rounded-md">
                    <span className="text-[0.75rem] font-bold text-zinc-600 dark:text-zinc-300 tracking-wide uppercase">
                        {tech}
                    </span>
                 </div>
                 {quality && (
                   <span className="text-[0.75rem] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                     {quality}
                   </span>
                 )}
               </div>
            </div>
        </div>

        {/* Efecto de brillo sutil en el borde al hacer hover */}
        <div className="absolute inset-0 rounded-[1.2rem] p-[1px] bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700" />
      </div>
    </div>
  );
}