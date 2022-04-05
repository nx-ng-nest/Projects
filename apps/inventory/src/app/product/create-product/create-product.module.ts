import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CreateProductComponent } from './create-product.component';

@NgModule({
  declarations: [CreateProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CreateProductComponent }]),
  ],
})
export class CreateProductModule {}
