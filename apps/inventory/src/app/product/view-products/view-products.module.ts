import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ViewProductsComponent } from './view-products.component';

@NgModule({
  declarations: [ViewProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ViewProductsComponent }]),
  ],
})
export class ViewProductsModule {}
