import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductService } from '@projects/client-service';
import {
  NavigationModule,
  TableModule,
} from '@projects/material';

import { InventoryComponent } from './inventory.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductComponent } from './product/product.component';
import { ProductDataSource } from './products-table/product-data-source';
import {
  ProductsTableComponent,
} from './products-table/products-table.component';

@NgModule({
  declarations: [
    InventoryComponent,
    ProductsTableComponent,
    ProductComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: InventoryComponent,
        children: [
          { path: 'product/:id', component: ProductComponent },
          { path: 'product-form', component: ProductFormComponent },
          { path: 'products-table', component: ProductsTableComponent },
        ],
      },
    ]),
    NavigationModule,
    TableModule,
  ],
  providers: [ProductService, ProductDataSource],
})
export class InventoryModule {}
