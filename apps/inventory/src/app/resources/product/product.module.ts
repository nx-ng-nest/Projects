import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import {
  CategoryService,
  ProductService,
} from '@projects/client-service';

import { CrudComponent } from '../../crud/crud.component';
import { CrudModule } from '../../crud/crud.module';
import { initFormOptions } from './product-form-options';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('product', {}),
    CrudModule.register({
      dataService: ProductService,
      initFormOptions: initFormOptions,
    }),
    RouterModule.forChild([
      {
        path: '',
        component: CrudComponent,
      },
    ]),
  ],
  providers: [ProductService, CategoryService],
})
export class ProductModule {}
