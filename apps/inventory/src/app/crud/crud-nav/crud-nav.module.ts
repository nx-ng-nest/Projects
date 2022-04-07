import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { AppCommonModule } from '../../common';
import { CrudNavComponent } from './crud-nav.component';

const routes: Routes = [{ path: '', component: CrudNavComponent }];

@NgModule({
  declarations: [CrudNavComponent],
  imports: [CommonModule, AppCommonModule, RouterModule.forChild(routes)],
})
export class CrudNavModule {}
