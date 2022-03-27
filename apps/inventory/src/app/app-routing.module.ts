import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ViewProductsComponent } from './product/view-products/view-products.component';

const routes: Routes = [
  { path: 'products', component: ViewProductsComponent },
  { path: 'product/:id', component: EditProductComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
