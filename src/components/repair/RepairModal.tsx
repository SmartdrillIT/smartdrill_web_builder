'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Check, MessageCircle, ChevronRight, PenLine, Sparkles,
  Smartphone, Battery, Plug, Camera, Speaker, Droplets, HelpCircle
} from "lucide-react";
import type { ModelWithBrand } from "@/types/catalog";
import type { RepairIssueId } from "@/types/repair";
import { useLanguage } from "@/context/LanguageContext";
import { useBodyScrollLock } from "@/hooks/useUi";
import {
  buildQuoteMessage,
  notifyQuoteSent,
  openWhatsApp,
} from "@/lib/whatsapp";

interface RepairModalProps {
  /** null = cerrado. Incluye `brand` para el mensaje de WhatsApp. */
  activeModel: ModelWithBrand | null;
  /** Marca seleccionada (la usa el flujo de Marcas); si falta se usa la del modelo. */
  selectedBrand?: string | null;
  onClose: () => void;
}

const ISSUE_ICONS: Record<RepairIssueId, typeof Smartphone> = {
  pantalla: Smartphone,
  bateria: Battery,
  puerto: Plug,
  camara: Camera,
  altavoz: Speaker,
  mojado: Droplets,
  otros: HelpCircle,
};

const ISSUE_IDS: RepairIssueId[] = [
  "pantalla",
  "bateria",
  "puerto",
  "camara",
  "altavoz",
  "mojado",
];

/**
 * Modal canónico de cotización. Unifica los dos `RepairModal` anteriores
 * (`layout/` y `ui/`) en un solo componente tipado e i18n.
 */
export default function RepairModal({ activeModel, selectedBrand, onClose }: RepairModalProps) {
  const { t } = useLanguage();
  const content = t("repairModal");
  const extra = t("repairExtra");

  const [selectedIssues, setSelectedIssues] = useState<RepairIssueId[]>([]);
  const [customIssue, setCustomIssue] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useBodyScrollLock(activeModel !== null);

  // Accesibilidad: cerrar con Escape mientras el modal está abierto.
  useEffect(() => {
    if (activeModel === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeModel, onClose]);

  if (!activeModel) return null;

  const brand = selectedBrand ?? activeModel.brand;

  const toggleIssue = (id: RepairIssueId) => {
    setSelectedIssues(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleWhatsApp = () => {
    const labels = selectedIssues.map((id) => content.options[id] as string);
    const detail = customIssue.trim();
    const message = buildQuoteMessage(
      content.whatsappMessage,
      `${brand} ${activeModel.name}`,
      detail ? [...labels, `Detalle adicional: ${detail}`] : labels
    );

    openWhatsApp(message);

    // Avisa a la Isla Dinámica del Navbar
    notifyQuoteSent({
      title: extra.sentTitle,
      message: extra.sentMessage,
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${brand} - ${extra.support}`}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      >
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
        />

        {/* Contenedor Principal del Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative flex flex-col md:flex-row w-full max-w-5xl bg-white dark:bg-[#161616] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden max-h-[90vh] md:max-h-[85vh] z-50 shadow-2xl border border-zinc-200 dark:border-zinc-800"
        >

          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div className="flex-1 flex flex-col min-w-0 max-h-[90vh] md:max-h-[85vh]">

            {/* Header */}
            <div className="p-6 pb-4 md:p-8 md:pb-4 flex justify-between items-start gap-3 shrink-0 border-b border-transparent">
              <div className="min-w-0 flex-1">
                <span className="inline-block max-w-full px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[0.75rem] font-bold uppercase tracking-widest mb-2 truncate">
                  {brand} - {extra.support}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight break-words">
                  {activeModel.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="md:hidden h-9 w-9 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cuerpo desplazable */}
            <div className="flex-1 overflow-y-auto min-h-0 px-6 py-2 md:px-8 md:py-4 custom-scrollbar">
              <h4 className="text-[0.8125rem] md:text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" />
                {content.title}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 md:mb-6">
                {ISSUE_IDS.map((id) => {
                  const Icon = ISSUE_ICONS[id];
                  const isSelected = selectedIssues.includes(id);
                  return (
                    <button
                      key={id}
                      onClick={() => toggleIssue(id)}
                      aria-pressed={isSelected}
                      className={`group flex items-center gap-3 md:gap-4 rounded-xl md:rounded-2xl p-3 md:p-4 text-left transition-all duration-300 border-2 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/5 text-blue-700 dark:text-blue-400 shadow-md'
                          : 'border-transparent bg-zinc-50 dark:bg-[#1c1c1e] hover:bg-zinc-100 dark:hover:bg-[#252525] text-zinc-900 dark:text-zinc-300'
                      }`}
                    >
                      <div className={`p-2 rounded-lg md:rounded-xl transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white'}`}>
                        <Icon className="h-4 w-4 md:h-5 md:w-5" />
                      </div>
                      <span className="flex-1 text-[0.8125rem] md:text-sm font-bold">
                          {content.options[id]}
                      </span>
                      <div className={`h-4 w-4 md:h-5 md:w-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-zinc-300 dark:border-zinc-700'}`}>
                        {isSelected && <Check className="h-2 w-2 md:h-3 md:w-3 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Acordeón Detalles */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 md:pt-6 mt-2 mb-4">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  aria-expanded={showDetails}
                  className="flex items-center justify-between w-full text-left group"
                >
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-sm md:text-base">
                    <PenLine className="h-4 w-4 text-blue-500" />
                    <span>{extra.details}</span>
                  </div>
                  <ChevronRight className={`h-5 w-5 text-zinc-400 transition-transform duration-300 ${showDetails ? 'rotate-90' : ''}`} />
                </button>

                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <textarea
                        value={customIssue}
                        onChange={(e) => setCustomIssue(e.target.value)}
                        placeholder={content.placeholder}
                        aria-label={content.placeholder}
                        className="w-full mt-4 rounded-xl md:rounded-2xl bg-zinc-50 dark:bg-[#1c1c1e] p-3 md:p-4 text-[0.8125rem] md:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none h-28 md:h-32 border border-zinc-200 dark:border-zinc-800 transition-all"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-4 md:p-8 md:pt-4 shrink-0 bg-white dark:bg-[#161616]">
              <button
                onClick={handleWhatsApp}
                className="group relative flex w-full items-center justify-center gap-2 md:gap-3 rounded-xl md:rounded-2xl bg-zinc-900 dark:bg-white py-4 md:py-5 font-bold text-white dark:text-black transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                <MessageCircle className="relative z-10 h-4 w-4 md:h-5 md:w-5" />
                <span className="relative z-10 text-sm md:text-lg">{content.cta}</span>
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA: IMAGEN (Desktop) */}
          <div className="hidden md:flex w-[40%] bg-zinc-50 dark:bg-[#1c1c1e] relative items-center justify-center p-12 overflow-hidden border-l border-zinc-100 dark:border-zinc-800">
            <div className="absolute h-[120%] w-[120%] rounded-full bg-blue-500/5 blur-3xl" />
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-8 right-8 h-10 w-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white shadow-sm transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              key={activeModel.name}
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
              className="relative z-0 w-full h-full flex items-center justify-center"
            >
              <Image
                src={activeModel.image}
                alt={activeModel.name}
                width={400}
                height={400}
                sizes="400px"
                className="max-h-[80%] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
              />
            </motion.div>

            <div className="absolute bottom-10 left-10 right-10 bg-white/50 dark:bg-black/20 backdrop-blur-md border border-zinc-200 dark:border-white/5 p-4 rounded-2xl shadow-sm">
              <p className="text-[0.75rem] text-zinc-500 uppercase font-black tracking-widest mb-1 text-center">{extra.quality}</p>
              <div className="flex justify-around items-center">
                  <div className="flex flex-col items-center"><Check className="h-4 w-4 text-blue-500" /><span className="text-[0.75rem] dark:text-zinc-400 font-bold">{extra.q1}</span></div>
                  <div className="flex flex-col items-center"><Check className="h-4 w-4 text-blue-500" /><span className="text-[0.75rem] dark:text-zinc-400 font-bold">{extra.q2}</span></div>
                  <div className="flex flex-col items-center"><Check className="h-4 w-4 text-blue-500" /><span className="text-[0.75rem] dark:text-zinc-400 font-bold">{extra.q3}</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
