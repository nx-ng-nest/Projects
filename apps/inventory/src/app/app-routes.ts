import { NavigationMenuItem } from '@projects/ui';

export interface AppRouteInterface {
  readonly website: NavigationMenuItem;
  readonly inventory: NavigationMenuItem;
}
/**
 * Routes for app.
 */
export const appRoutes: AppRouteInterface = {
  website: {
    icon: '',
    path: '',
    label: 'Website',
    pageName: 'Website',
  },
  inventory: {
    icon: 'inventory',
    path: 'Inventory',
    label: 'inventory',
    pageName: 'View Products',
  },
};
