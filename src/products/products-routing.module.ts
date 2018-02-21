import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromContainers from "./containers";

const routes: Routes = [
  {
    path : "",
    pathMatch: "full",
    redirectTo: "shop"
  },
  {
    path: "shop/:itemId",
    component: fromContainers.ProductItemComponent,
  },
  {
    path : "shop",
    component: fromContainers.ProductsComponent,
  },
  {
    path: "checkout",
    component: fromContainers.CheckoutComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
