import { INavItem } from './INavItem';
import { RoutePath } from './route-path.enum';

export const navigationData: INavItem[] = [
  { path: RoutePath.VIEW_PRODUCTS, icon: 'inventory' },
  { path: RoutePath.EDIT_PRODUCTS, icon: 'edit' },
];
