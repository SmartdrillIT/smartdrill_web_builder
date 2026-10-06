/** Servicio de autenticación de distribuidores. */
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "@/types/api";
import { apiRequest } from "./api-client";
import { clearSession } from "./token.service";

/** Inicia sesión. */
export function login(credentials: LoginCredentials): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/login", {
    method: "POST",
    body: credentials,
  });
}

/** Alias histórico usado por las páginas de distribuidores. */
export const loginDistributor = login;

/** Registra un nuevo distribuidor. */
export function register(userData: RegisterData): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/register", {
    method: "POST",
    body: userData,
  });
}

/** Alias histórico usado por las páginas de distribuidores. */
export const registerDistributor = register;

/** Cierra la sesión (backend + limpieza local garantizada). */
export function logout(): Promise<unknown> {
  return apiRequest("/logout", { method: "POST" }).finally(clearSession);
}

/** Alias histórico. */
export const logoutDistributor = logout;
