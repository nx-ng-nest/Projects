import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { CrudComponent } from './crud.component';

const routes: Routes = [
  {
    path: '',
    component: CrudComponent,
  },
  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then((m) => m.ViewModule),
  },

  {
    path: 'create',
    loadChildren: () =>
      import('./create/create.module').then((m) => m.CreateModule),
  },
  {
    path: 'update',
    loadChildren: () =>
      import('./update/update.module').then((m) => m.UpdateModule),
  },
  {
    path: 'delete',
    loadChildren: () =>
      import('./delete/delete.module').then((m) => m.DeleteModule),
  },

  {
    path: '',
    loadChildren: () =>
      import('./crud-nav/crud-nav.module').then((m) => m.CrudNavModule),
    outlet: 'crud-navitems',
  },
];

@NgModule({
  declarations: [CrudComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CrudModule {}
