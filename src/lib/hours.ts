/**
 * Horario comercial de SmartDrill y cálculo de estado abierto/cerrado.
 * Todo se evalúa en hora de Quito (America/Guayaquil, UTC-5 fijo sin DST),
 * no en la zona horaria del visitante.
 */

export const BUSINESS_TZ = "America/Guayaquil";

interface DaySchedule {
  open: string; // "09:00"
  close: string; // "18:00"
}

/** Índice 0 = domingo. null = cerrado. */
const WEEK_SCHEDULE: (DaySchedule | null)[] = [
  null, // Dom
  { open: "09:00", close: "18:00" }, // Lun
  { open: "09:00", close: "18:00" }, // Mar
  { open: "09:00", close: "18:00" }, // Mié
  { open: "09:00", close: "18:00" }, // Jue
  { open: "09:00", close: "18:00" }, // Vie
  { open: "10:00", close: "14:00" }, // Sáb
];

/** Minutos antes del cierre para mostrar "cierra pronto". */
export const CLOSING_SOON_MINUTES = 30;

export interface QuitoTime {
  weekday: number; // 0 = domingo
  minutes: number; // minutos desde medianoche
}

/** Hora actual de pared en Quito, sin importar el huso del visitante. */
export function nowInQuito(at: Date = new Date()): QuitoTime {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TZ,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(at);

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "0";
  const weekdayIndex: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  return {
    weekday: weekdayIndex[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export type OpenStatus =
  | { open: true; closesAt: string; closingSoon: boolean }
  | {
      open: false;
      /** 0 = hoy, 1 = mañana, 2+ = día de la semana indicado. */
      dayOffset: number;
      weekday: number;
      opensAt: string;
    };

export function getOpenStatus(at: Date = new Date()): OpenStatus {
  const now = nowInQuito(at);

  for (let offset = 0; offset < 8; offset++) {
    const weekday = (now.weekday + offset) % 7;
    const sched = WEEK_SCHEDULE[weekday];
    if (!sched) continue;

    const openMin = toMinutes(sched.open);
    const closeMin = toMinutes(sched.close);

    if (offset === 0) {
      if (now.minutes >= openMin && now.minutes < closeMin) {
        return {
          open: true,
          closesAt: sched.close,
          closingSoon: closeMin - now.minutes <= CLOSING_SOON_MINUTES,
        };
      }
      // Ya cerró hoy o aún no abre: la próxima apertura es hoy solo si falta.
      if (now.minutes < openMin) {
        return { open: false, dayOffset: 0, weekday, opensAt: sched.open };
      }
      continue;
    }
    return { open: false, dayOffset: offset, weekday, opensAt: sched.open };
  }
  // Inalcanzable con horario semanal válido, pero tipado total.
  return { open: false, dayOffset: 1, weekday: 1, opensAt: "09:00" };
}
