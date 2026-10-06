"use client";

import type { DistributorUser } from "@/types/api";

const TOKEN_KEY = "token";
const USER_KEY = "user";

function storage(): Storage | null {
  return typeof window !== "undefined" ? window.localStorage : null;
}

export function getToken(): string | null {
  return storage()?.getItem(TOKEN_KEY) ?? null;
}

export function setToken(token: string): void {
  storage()?.setItem(TOKEN_KEY, token);
}

export function getSessionUser(): DistributorUser | null {
  try {
    const raw = storage()?.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as DistributorUser) : null;
  } catch {
    return null;
  }
}

export function setSession(token: string, user?: DistributorUser): void {
  const store = storage();
  store?.setItem(TOKEN_KEY, token);
  if (user !== undefined) store?.setItem(USER_KEY, JSON.stringify(user));
}

/** Limpia la sesión local (usado en logout y 401). */
export function clearSession(): void {
  const store = storage();
  store?.removeItem(TOKEN_KEY);
  store?.removeItem(USER_KEY);
}
