import { NavigationMenuItem } from '@projects/ui';
import { ProductsComponent } from './products/products.component';

export const inventoryRoutes: Readonly<NavigationMenuItem[]> = [
  {
    path: $localize`view-products`,
    icon: `inventory`,
    label: `Products`,
    pageName: `View Products`,
    component: ProductsComponent,
  },
];
