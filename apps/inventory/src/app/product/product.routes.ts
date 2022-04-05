import { Routes } from '@angular/router';

import {
  ProductNavigationComponent,
} from './product-navigation/product-navigation.component';
import { ProductComponent } from './product.component';

export const routes: Routes = [
  {
    path: '',
    outlet: 'product-navitems',
    component: ProductNavigationComponent,
  },
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'view',
        loadChildren: () =>
          import('./view-products/view-products.module').then(
            (m) => m.ViewProductsModule
          ),
      },

      {
        path: 'view/:id',
        loadChildren: () =>
          import('./view-product/view-product.module').then(
            (m) => m.ViewProductModule
          ),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./create-product/create-product.module').then(
            (m) => m.CreateProductModule
          ),
      },
      {
        path: 'update',
        loadChildren: () =>
          import('./update-product/update-product.module').then(
            (m) => m.UpdateProductModule
          ),
      },
    ],
  },
];
