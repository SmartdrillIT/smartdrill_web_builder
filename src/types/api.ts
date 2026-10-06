/** Tipos de la capa de servicios/API. */

export interface DistributorUser {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  [key: string]: unknown;
}

export interface AuthResponse {
  access_token: string;
  token_type?: string;
  user?: DistributorUser;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  email: string;
  phone?: string;
  password_confirmation: string;
}

export interface Reparacion {
  id?: number | string;
  [key: string]: unknown;
}

export class ApiError extends Error {
  status?: number;
  errors?: Record<string, string[]>;
}
