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
    label: 'website',
    pageName: 'Website',
  },
  inventory: {
    icon: 'inventory',
    path: 'inventory',
    label: 'inventory',
    pageName: 'View Products',
  },
};
