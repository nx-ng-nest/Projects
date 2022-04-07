import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
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
    CdkStepperModule,

    FormModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class CreateModule {}
