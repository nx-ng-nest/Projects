import { HttpClientModule } from '@angular/common/http';
import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { createReducer, StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { entityConfig } from './entity-metadata';
import '@angular/localize/init';
import {
  MaterialModule,
  NavigationModule,
  NavigationStoreState,
} from '@projects/ui';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    NavigationModule,
    // StoreModue, EffectsModule, and EntityDataModule will be the following order
    StoreModule.forRoot<{ navigationStore?: NavigationStoreState }>(
      {},
      {
        initialState: JSON.parse(localStorage.getItem('store') || '{}'),
      }
    ),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
