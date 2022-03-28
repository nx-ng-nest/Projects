import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ViewProductsComponent } from './product/view-products/view-products.component';
import { RoutePath } from './navigation/route-path.enum';

const routes: Routes = [
  { path: RoutePath.VIEW_PRODUCTS, component: ViewProductsComponent },
  { path: RoutePath.EDIT_PRODUCTS, component: EditProductComponent },
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
