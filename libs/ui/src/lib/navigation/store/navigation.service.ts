import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationMenuItem } from './navigation-item.class';
import {
  navigationActions,
  selectClickedNavigationMenuItem,
  selectNavigationMenu,
  selectPageName,
  selectURL,
} from './navigation.reducer';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  pageName$ = this.store.select(selectPageName);
  navigationMenuItems$ = this.store.select(selectNavigationMenu);
  url$ = this.store.select(selectURL);
  navigationItem$ = this.store.select(selectClickedNavigationMenuItem);

  constructor(private store: Store, private router: Router) {}

  setNavigationMenuItems(navigationMenu: NavigationMenuItem[]) {
    this.store.dispatch(
      navigationActions.SET_NAVIGATION_MENU_ITEMS({
        navigationMenu,
      })
    );
  }

  setCurrentPage(pageName: string) {
    this.store.dispatch(navigationActions.SET_PAGENAME({ pageName }));
  }

  setCurrentlyClickedNavigationMenuItem(
    navigationMenuItem: NavigationMenuItem
  ) {
    this.store.dispatch(
      navigationActions.SET_CLICKED_NAVIGATION_MENU_ITEM({ navigationMenuItem })
    );
  }

  setUrl(url: string) {
    this.store.dispatch(navigationActions.SET_URL({ url }));
  }

  navigate(navigationMenuItem: NavigationMenuItem) {
    this.setCurrentPage(navigationMenuItem.pageName);
    this.setUrl(navigationMenuItem.path);
    this.setCurrentlyClickedNavigationMenuItem(navigationMenuItem);
    this.router.navigate([navigationMenuItem.path]);
  }
}
