import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductTableComponent } from './product-table.component';

@NgModule({
  declarations: [ProductTableComponent],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: ProductTableComponent }]),
  ],
  exports: [RouterModule],
})
export class ProductTableModule {}
