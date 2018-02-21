import { ProductsGuard } from "./products.guard";
import { ProductExistsGuards } from "./product-exists.guard";

export const guards: any[] = [
  ProductsGuard,
  ProductExistsGuards
]

export * from "./products.guard";
export * from "./product-exists.guard";
