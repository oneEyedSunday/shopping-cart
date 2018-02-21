import { ProductsComponent } from './products/products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { CheckoutComponent } from "./checkout/checkout.component";

export const containers: any[] = [
  ProductsComponent,
  ProductItemComponent,
  CheckoutComponent
];

export * from './products/products.component';
export * from './product-item/product-item.component';
export * from "./checkout/checkout.component";
