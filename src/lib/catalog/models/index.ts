import type { Catalog } from "@/types/catalog";
import { appleModels } from "./apple";
import { samsungModels } from "./samsung";
import { huaweiModels } from "./huawei";
import { xiaomiModels } from "./xiaomi";
import { tecnoModels } from "./tecno";
import { infinixModels } from "./infinix";
import { zteModels } from "./zte";
import { oppoModels } from "./oppo";
import { realmeModels } from "./realme";
import { tclModels } from "./tcl";
import { vivoModels } from "./vivo";
import { oneplusModels } from "./oneplus";
import { motorolaModels } from "./motorola";
import { sonyModels } from "./sony";
import { lgModels } from "./lg";
import { nokiaModels } from "./nokia";
import { htcModels } from "./htc";
import { honorModels } from "./honor";

/**
 * Catálogo completo de modelos por marca.
 * Mantiene la misma forma que el antiguo `lib/data.ts` para no romper
 * a los consumidores (búsqueda del Hero, sección de Marcas).
 */
export const MODELS: Catalog = {
  Apple: appleModels,
  Samsung: samsungModels,
  Huawei: huaweiModels,
  Xiaomi: xiaomiModels,
  Tecno: tecnoModels,
  Infinix: infinixModels,
  ZTE: zteModels,
  OPPO: oppoModels,
  Realme: realmeModels,
  TCL: tclModels,
  Vivo: vivoModels,
  OnePlus: oneplusModels,
  Motorola: motorolaModels,
  Sony: sonyModels,
  LG: lgModels,
  Nokia: nokiaModels,
  HTC: htcModels,
  Honor: honorModels,
};
