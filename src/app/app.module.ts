import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// bootstrap
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app/app.component';

import { StoreModule, MetaReducer , ActionReducerMap, ActionReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from "ngrx-store-freeze";
// ngrx
import { StoreRouterConnectingModule, RouterStateSerializer } from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";
import { reducers, CustomRouterStateSerializer  } from "./store";

// ngrx-store-localstorage
// for persistence on reload
import { localStorageSync } from "ngrx-store-localstorage";


const environment = {
  development: true,
  production: false
};

export const metaReducers: Array<MetaReducer<any, any>> =  !environment.production ? [
  localStorageSyncReducer,
  storeFreeze
] : [localStorageSyncReducer];

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['products'],
    rehydrate: true
  })(reducer)
}

@NgModule({
  imports: [
    BrowserModule,
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
