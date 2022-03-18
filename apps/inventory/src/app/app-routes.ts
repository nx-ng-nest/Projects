import { Routes } from '@angular/router';

import { NxWelcomeComponent } from './nx-welcome.component';

export const routes: Routes = [
  {
    path: '',
    component: NxWelcomeComponent,
  },

  {
    path: 'inventory',
    loadChildren: () =>
      import('./inventory/inventory.module').then((m) => m.InventoryModule),
  },
];
