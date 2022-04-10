import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { CrudModuleOptions } from './crud-module-options';
import { CrudModuleTokens } from './crud-tokens.enum';
import { CrudComponent } from './crud.component';
import { UserCanActivate } from './user-can-activate.guard';

const routes: Routes = [
  {
    path: '',
    component: CrudComponent,
  },
  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then((m) => m.ViewModule),
    canActivate: [UserCanActivate],
  },

  {
    path: 'create',
    loadChildren: () =>
      import('./create/create.module').then((m) => m.CreateModule),
    canActivate: [UserCanActivate],
  },
  {
    path: 'update',
    loadChildren: () =>
      import('./update/update.module').then((m) => m.UpdateModule),
    canActivate: [UserCanActivate],
  },
  {
    path: 'delete',
    loadChildren: () =>
      import('./delete/delete.module').then((m) => m.DeleteModule),
    canActivate: [UserCanActivate],
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
  imports: [CommonModule, MatSnackBarModule, RouterModule.forChild(routes)],
})
export class CrudModule {
  static register(options: CrudModuleOptions): ModuleWithProviders<CrudModule> {
    return {
      ngModule: CrudModule,
      providers: [
        {
          provide: UserCanActivate,
          useClass: options.userCanActivate,
        },
        {
          provide: CrudModuleTokens.CRUD_DATA_SERVICE,
          useClass: options.dataService,
        },
        {
          provide: CrudModuleTokens.CRUD_INIT_FORM_OPTIONS,
          useValue: options.initFormOptions,
        },
      ],
    };
  }
}
