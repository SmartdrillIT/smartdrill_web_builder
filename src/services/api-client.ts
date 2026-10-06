/**
 * Cliente HTTP nativo para el backend (Laravel/Sanctum).
 * Misma semántica que el anterior `service/PrivateService.js`, pero tipado.
 */
import { API_URL } from "@/lib/config";
import { ApiError } from "@/types/api";
import { clearSession, getToken } from "./token.service";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
}

function buildHeaders(custom?: Record<string, string>): Headers {
  const headers = new Headers();
  headers.append("Accept", "application/json");

  const token = getToken();
  if (token) headers.append("Authorization", `Bearer ${token}`);

  if (custom) {
    for (const [key, value] of Object.entries(custom)) {
      if (value !== undefined) headers.append(key, value);
    }
  }
  return headers;
}

/** Petición base tipada. En 401 limpia la sesión y redirige al login. */
export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const headers = buildHeaders(options.headers);

  const init: RequestInit = {
    method: options.method ?? "GET",
    headers,
  };

  if (options.body !== undefined) {
    if (options.body instanceof FormData) {
      init.body = options.body; // fetch fija el Content-Type solo
    } else {
      headers.append("Content-Type", "application/json");
      init.body = JSON.stringify(options.body);
    }
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, init);
  } catch (cause) {
    const error = new ApiError(`Fallo de red en ${endpoint}`);
    error.cause = cause;
    throw error;
  }

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as {
      message?: string;
      errors?: Record<string, string[]>;
    };

    if (response.status === 401 && typeof window !== "undefined") {
      clearSession();
      window.location.href = "/distribuidores/login";
    }

    const error = new ApiError(
      errorData.message ?? `Error ${response.status}`
    );
    error.status = response.status;
    error.errors = errorData.errors; // validaciones de Laravel
    throw error;
  }

  return (await response.json()) as T;
}
