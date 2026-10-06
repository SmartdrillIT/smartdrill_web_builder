import type { ReactNode } from "react";
import { Cpu } from "lucide-react";

interface AuthShellProps {
  title: string;
  subtitle: string;
  /** Posición del resplandor decorativo (cada página usa la suya). */
  glowClassName: string;
  maxWidthClass?: string;
  error?: string;
  children: ReactNode;
  footer: ReactNode;
}

/** Marco visual compartido del portal de distribuidores. */
export default function AuthShell({
  title,
  subtitle,
  glowClassName,
  maxWidthClass = "max-w-md",
  error,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[#e4e4e7] dark:bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo Decorativo */}
      <div className={`absolute w-[40%] h-[40%] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none ${glowClassName}`} />

      <div className={`w-full ${maxWidthClass} bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 shadow-2xl relative z-10`}>
        <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-orange-400 to-zinc-900" />

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="h-12 w-12 bg-zinc-900 text-orange-500 flex items-center justify-center border border-zinc-700">
              <Cpu size="1.5rem" />
            </div>
          </div>

          <h2 className="text-center font-bold text-2xl text-zinc-900 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-center text-xs text-zinc-500 tracking-widest mb-8">
            {subtitle}
          </p>

          {error && (
            <p className="bg-red-500/10 border border-red-500 text-red-500 text-xs p-3 mb-4 text-center">
              {error}
            </p>
          )}

          {children}

          <div className="mt-6 text-center border-t border-zinc-200 dark:border-zinc-800 pt-4">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
