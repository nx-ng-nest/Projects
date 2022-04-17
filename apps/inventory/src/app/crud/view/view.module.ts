import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { TableModule } from '@projects/ui';

import { CrudModuleTokens } from '../crud-tokens.enum';
import {
  addToolbarOptionsToModule,
  provideToolbarOptionsToModule,
} from '../utils';
import { ViewAllComponent } from './view-all/view-all.component';
import { ViewByIdComponent } from './view-by-id/view-by-id.component';
import { ViewComponent } from './view.component';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
    children: [
      {
        path: '',
        component: ViewAllComponent,
      },
      { path: 'one/:id', component: ViewByIdComponent },
    ],
  },
  addToolbarOptionsToModule(),
];

@NgModule({
  declarations: [ViewComponent, ViewAllComponent, ViewByIdComponent],
  imports: [CommonModule, TableModule, RouterModule.forChild(routes)],
  providers: [
    provideToolbarOptionsToModule(CrudModuleTokens.VIEW_TOOLBAR_OPTIONS),
  ],
})
export class ViewModule {}
