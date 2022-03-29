import { NavigationMenuItem } from '@projects/ui';

export interface InventoryRouteInterface {
  readonly products: NavigationMenuItem;
}
/**
 * Routes for app.
 */
export const inventoryRoutes: InventoryRouteInterface = {
  products: {
    icon: '',
    path: '',
    label: 'products',
    pageName: 'products',
  },
};
