import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationModule, TableModule } from '@projects/ui';
import { ProductsComponent } from './products/products.component';
import { inventoryRoutes } from './inventory-routes';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      {
        path: inventoryRoutes.products.path,
        component: ProductsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [InventoryComponent, ProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    NavigationModule,
  ],
})
export class InventoryModule {}
