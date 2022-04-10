import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { FormModule } from '@projects/ui';

import { CreateComponent } from './create.component';

const routes: Routes = [{ path: '', component: CreateComponent }];

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    FormModule,
  ],
})
export class CreateModule {}
