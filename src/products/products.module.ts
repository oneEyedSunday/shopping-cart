import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from "./products-routing.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers, effects } from "./store";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { Title } from '@angular/platform-browser';

// components
import * as fromComponents from "./components";
import * as fromContainers from "./containers";
import * as fromServices from "./services";

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', reducers ),
    EffectsModule.forFeature(effects),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [...fromServices.services],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  exports: [
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class ProductsModule { }
