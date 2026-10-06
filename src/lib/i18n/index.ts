import es from "./es.json";
import en from "./en.json";

export type Language = "es" | "en";
export type Dictionary = typeof es;

export const dictionaries: Record<Language, Dictionary> = { es, en };
