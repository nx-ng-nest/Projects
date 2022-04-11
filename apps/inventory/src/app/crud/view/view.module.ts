import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { TableModule } from '@projects/ui';

import { ViewComponent } from './view.component';

const routes: Routes = [{ path: '', component: ViewComponent }];

@NgModule({
  declarations: [ViewComponent],
  imports: [CommonModule, TableModule, RouterModule.forChild(routes)],
})
export class ViewModule {}
