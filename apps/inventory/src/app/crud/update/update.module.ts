import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { CrudModuleTokens } from '../crud-tokens.enum';
import {
  addToolbarOptionsToModule,
  provideToolbarOptionsToModule,
} from '../utils';
import { UpdateComponent } from './update.component';

const routes: Routes = [
  { path: '', component: UpdateComponent },
  addToolbarOptionsToModule(),
];

@NgModule({
  declarations: [UpdateComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [
    provideToolbarOptionsToModule(CrudModuleTokens.UPDATE_TOOLBAR_OPTIONS),
  ],
})
export class UpdateModule {}
