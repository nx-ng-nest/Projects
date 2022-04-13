import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { CrudModuleTokens } from '../crud-tokens.enum';
import {
  addToolbarOptionsToModule,
  provideToolbarOptionsToModule,
} from '../utils';
import { DeleteComponent } from './delete.component';

// addToolbarOptionsToModule

const routes: Routes = [
  { path: '', component: DeleteComponent },
  addToolbarOptionsToModule(),
];

@NgModule({
  declarations: [DeleteComponent],
  imports: [CommonModule, MatCardModule, RouterModule.forChild(routes)],
  providers: [
    provideToolbarOptionsToModule(CrudModuleTokens.DELETE_TOOLBAR_OPTIONS),
  ],
})
export class DeleteModule {}
