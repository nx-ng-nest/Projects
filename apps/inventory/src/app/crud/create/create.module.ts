import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  BasicTableModule,
  FormModule,
} from '@projects/ui';

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
    MatDialogModule,
    MatSnackBarModule,
    BasicTableModule,
    MatProgressSpinner
  ],
})
export class CreateModule {}
