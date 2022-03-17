import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { entityConfig } from './entity-metadata';
import { NxWelcomeComponent } from './nx-welcome.component';

const routes: Routes = [{ path: '', component: NxWelcomeComponent }];

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      initialNavigation: 'enabledBlocking',
    }),
    BrowserAnimationsModule,
    HttpClientModule,

    // StoreModue, EffectsModule, and EntityDataModule will be the following order
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
