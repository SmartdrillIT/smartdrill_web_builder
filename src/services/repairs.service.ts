/** Servicio de órdenes de reparación del distribuidor autenticado. */
import type { Reparacion } from "@/types/api";
import { apiRequest } from "./api-client";

/** GET /api/reparaciones — todas las del distribuidor. */
export function getReparaciones(): Promise<Reparacion[]> {
  return apiRequest<Reparacion[]>("/reparaciones");
}

/** GET /api/reparaciones/:id — detalle de una reparación. */
export function getReparacionById(id: number | string): Promise<Reparacion> {
  return apiRequest<Reparacion>(`/reparaciones/${id}`);
}

/** POST /api/reparaciones — registra una orden (JSON o FormData con fotos). */
export function createReparacion(
  reparacionData: Reparacion | FormData
): Promise<Reparacion> {
  return apiRequest<Reparacion>("/reparaciones", {
    method: "POST",
    body: reparacionData,
  });
}

/** PUT /api/reparaciones/:id — actualiza una reparación existente. */
export function updateReparacion(
  id: number | string,
  reparacionData: Reparacion | FormData
): Promise<Reparacion> {
  return apiRequest<Reparacion>(`/reparaciones/${id}`, {
    method: "PUT",
    body: reparacionData,
  });
}
