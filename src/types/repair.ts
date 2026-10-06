/** Tipos del flujo de cotización / reparación. */

export type RepairIssueId =
  | "pantalla"
  | "bateria"
  | "puerto"
  | "camara"
  | "altavoz"
  | "mojado"
  | "otros";

export interface RepairOption {
  id: RepairIssueId;
  label: string;
}

export interface QuoteRequest {
  brand: string;
  model: string;
  issues: string[];
  detail?: string;
}
