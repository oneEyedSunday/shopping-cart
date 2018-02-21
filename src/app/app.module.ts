import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// bootstrap
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app/app.component';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from "ngrx-store-freeze";
// ngrx
import { StoreRouterConnectingModule, RouterStateSerializer } from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";
import { reducers, CustomRouterStateSerializer  } from "./store";


const environment = {
  development: true,
  production: false
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // regster router reducers
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    EffectsModule.forRoot([]),
    environment.development ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    Title,
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer}
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule{}
