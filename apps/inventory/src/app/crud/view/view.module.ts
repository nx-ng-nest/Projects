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
import { ViewComponent } from './view.component';

const routes: Routes = [
  { path: '', component: ViewComponent },
  addToolbarOptionsToModule(),
];

@NgModule({
  declarations: [ViewComponent],
  imports: [CommonModule, TableModule, RouterModule.forChild(routes)],
  providers: [
    provideToolbarOptionsToModule(CrudModuleTokens.VIEW_TOOLBAR_OPTIONS),
  ],
})
export class ViewModule {}
