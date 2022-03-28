import { HttpClientModule } from '@angular/common/http';
import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { entityConfig } from './entity-metadata';
import { NavigationComponent } from './navigation/navigation.component';
import { ViewProductsComponent } from './product/view-products/view-products.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { appReducer } from './app-store.reducers';
import { AppService } from './app.service';
import { NavigationService } from './navigation/navigation.service';
import { materialModules } from './material.module';
import { PathToLabelPipe } from './common/path-to-label.pipe';
import { ProductService } from '@projects/client-service';

materialModules;
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ViewProductsComponent,
    DashboardComponent,
    EditProductComponent,
    PathToLabelPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    // StoreModue, EffectsModule, and EntityDataModule will be the following order
    StoreModule.forRoot(
      { app: appReducer },
      {
        initialState: {},
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
    ...materialModules,
  ],

  providers: [AppService, NavigationService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private readonly productService: ProductService) {
    this.productService.getAll().subscribe();
  }
}
