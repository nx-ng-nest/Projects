import { Routes } from '@angular/router';

import { NavigationComponent } from './navigation.component';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'product',
        loadChildren: () =>
          import('./../product/product.module').then((m) => m.ProductModule),
        data: { pageName: 'Product' },
      },
    ],
  },
];
