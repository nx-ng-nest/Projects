import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UpdateProductComponent } from './update-product.component';

@NgModule({
  declarations: [UpdateProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: UpdateProductComponent }]),
  ],
})
export class UpdateProductModule {}
