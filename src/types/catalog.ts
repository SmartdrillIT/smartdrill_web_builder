/** Tipos compartidos del catálogo de dispositivos. */

export interface PhoneModel {
  name: string;
  year: number;
  /** Ruta pública de la imagen, ej. `/samsung/S24+.png`. */
  image: string;
}

/** Un modelo con su marca resuelta (lo que viaja al RepairModal). */
export interface ModelWithBrand extends PhoneModel {
  brand: string;
}

/** Catálogo completo: marca -> modelos. */
export type Catalog = Record<string, PhoneModel[]>;

export interface Brand {
  name: string;
  color: string;
  hover: string;
  tint: string;
  logo: string;
  logoClass: string;
}
