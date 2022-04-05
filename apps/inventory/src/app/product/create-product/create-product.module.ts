import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { FormModule } from '@projects/ui';

import { CreateProductComponent } from './create-product.component';

@NgModule({
  declarations: [CreateProductComponent],
  imports: [
    CommonModule,
    FormModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,

    RouterModule.forChild([{ path: '', component: CreateProductComponent }]),
  ],
})
export class CreateProductModule {}
