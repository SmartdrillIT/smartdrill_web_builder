"use client";

import { useEffect } from "react";

/** Cierra al hacer clic fuera del `ref` (reemplaza el listener manual repetido). */
export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  active: boolean,
  onOutside: () => void
): void {
  useEffect(() => {
    if (!active) return;
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutside();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, active, onOutside]);
}

/** Bloquea el scroll del body mientras `locked` sea true (modales). */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [locked]);
}
