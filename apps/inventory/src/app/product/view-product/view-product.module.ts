import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ViewProductComponent } from './view-product.component';

@NgModule({
  declarations: [ViewProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ViewProductComponent }]),
  ],
})
export class ViewProductModule {}
