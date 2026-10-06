"use client";

import { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/hours";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Pastilla "Abierto ahora / Cerrado" según la hora real de Quito.
 * Se re-evalúa cada 30 segundos. 100% frontend, sin backend.
 */
export default function OpenStatusBadge({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  const copy = t("openStatus");
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  const status = getOpenStatus();
  const fill = (template: string, time: string, day = "") =>
    template.replace("{time}", time).replace("{day}", day);

  let dot = "bg-zinc-400";
  let text = "";
  if (status.open) {
    if (status.closingSoon) {
      dot = "bg-amber-500";
      text = `${copy.closingSoon} · ${status.closesAt}`;
    } else {
      dot = "bg-green-500";
      text = `${copy.openNow} · ${fill(copy.until, status.closesAt)}`;
    }
  } else {
    dot = "bg-red-500";
    const when =
      status.dayOffset === 0
        ? fill(copy.opensToday, status.opensAt)
        : status.dayOffset === 1
          ? fill(copy.opensTomorrow, status.opensAt)
          : fill(copy.opensDay, status.opensAt, copy.weekdays[status.weekday]);
    text = `${copy.closed} · ${when}`;
  }

  return (
    <span
      role="status"
      className={`inline-flex items-center gap-2 rounded-full bg-white dark:bg-[#1c1c1e] border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 shadow-sm ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${dot}`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      {text}
    </span>
  );
}
