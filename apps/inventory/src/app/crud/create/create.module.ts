import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { FormModule } from '@projects/ui';

import { CrudModuleTokens } from '../crud-tokens.enum';
import {
  addToolbarOptionsToModule,
  provideToolbarOptionsToModule,
} from '../utils';
import { CreateComponent } from './create.component';

const routes: Routes = [
  { path: '', component: CreateComponent },
  addToolbarOptionsToModule(),
];

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    FormModule,
    MatCardModule,
  ],
  providers: [
    provideToolbarOptionsToModule(CrudModuleTokens.CREATE_TOOLBAR_OPTIONS),
  ],
})
export class CreateModule {}
