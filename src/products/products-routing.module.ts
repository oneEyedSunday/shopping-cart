import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromContainers from "./containers";
import * as fromGuards  from "./guards";

const routes: Routes = [
  {
    path : "",
    pathMatch: "full",
    redirectTo: "shop"
  },
  {
    path: "shop/:itemId",
    canActivate: [fromGuards.ProductExistsGuards],
    component: fromContainers.ProductItemComponent,
  },
  {
    path : "shop",
    canActivate: [fromGuards.ProductsGuard],
    component: fromContainers.ProductsComponent,
  },
  {
    path: "checkout",
    component: fromContainers.CheckoutComponent
  },
  {
    path: "**",
    redirectTo: "shop"
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
