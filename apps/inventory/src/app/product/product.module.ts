import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { AppCommonModule } from '../common/app-common.module';
import {
  ProductNavigationComponent,
} from './product-navigation/product-navigation.component';
import { ProductComponent } from './product.component';
import { routes } from './product.routes';

@NgModule({
  declarations: [ProductComponent, ProductNavigationComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,

    RouterModule.forChild(routes),
  ],
})
export class ProductModule {}
