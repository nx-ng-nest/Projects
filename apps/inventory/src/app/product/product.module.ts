import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductService } from '@projects/client-service';

import { ProductComponent } from './product.component';

@NgModule({
  declarations: [ProductComponent],
  imports: [RouterModule.forChild([{ path: '', component: ProductComponent }])],
  providers: [ProductService],
})
export class ProductModule {}
