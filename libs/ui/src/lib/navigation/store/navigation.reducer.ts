import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { NavigationMenuItem } from './navigation-item.class';
import { NavigationEnum } from './navigation-store-name';

/**
 * Navigation store state
 */
export interface NavigationStoreState {
  /**
   * List of navigation menu items
   */
  navigationMenu: NavigationMenuItem[];

  /**
   * Name of the currently navigated page
   */
  pageName: string;

  /**
   * Url of the currently navigated page
   */
  url: string;

  /**
   * Object of currently clicked navigation menu item
   */
  navigationMenuItem: NavigationMenuItem;
}

const initialState: NavigationStoreState = {
  pageName: '',
  navigationMenu: [],
  url: '',
  navigationMenuItem: {
    path: '',
    icon: 'inventory',
    label: '/',
    pageName: 'Welcome',
  },
};

export const navigationActions = {
  SET_PAGENAME: createAction(
    `[NAVIGATION STORE] SET PAGE NAME`,
    props<{ pageName: string }>()
  ),
  SET_NAVIGATION_MENU_ITEMS: createAction(
    '[NAVIGATION STORE] SET NAVIGATION MENU ITEMS',
    props<{ navigationMenu: NavigationMenuItem[] }>()
  ),
  SET_URL: createAction('[NAVIGATION STORE] SET URL', props<{ url: string }>()),
  SET_CLICKED_NAVIGATION_MENU_ITEM: createAction(
    `[NAVIGATION STORE] SET CLICKED NAVIGATION MENU ITEM`,
    props<{ navigationMenuItem: NavigationMenuItem }>()
  ),
};

export const navigationReducer = createReducer<NavigationStoreState>(
  initialState,
  on(
    navigationActions.SET_NAVIGATION_MENU_ITEMS,
    (state, action): NavigationStoreState => {
      return {
        ...state,
        navigationMenu: action.navigationMenu,
      };
    }
  ),

  on(navigationActions.SET_PAGENAME, (state, action): NavigationStoreState => {
    return {
      ...state,
      pageName: action.pageName,
    };
  }),
  on(navigationActions.SET_URL, (state, action): NavigationStoreState => {
    return {
      ...state,
      url: action.url,
    };
  }),
  on(
    navigationActions.SET_CLICKED_NAVIGATION_MENU_ITEM,
    (state, action): NavigationStoreState => {
      return {
        ...state,
        navigationMenuItem: action.navigationMenuItem,
      };
    }
  )
);

const selectNavigationFeature = (appState: any) => {
  return appState[NavigationEnum.storeName];
};

export const selectPageName = createSelector(
  selectNavigationFeature,
  (state: NavigationStoreState) => state.pageName
);
export const selectNavigationMenu = createSelector(
  selectNavigationFeature,
  (state: NavigationStoreState) => state.navigationMenu
);
export const selectURL = createSelector(
  selectNavigationFeature,
  (state: NavigationStoreState) => state.url
);
export const selectClickedNavigationMenuItem = createSelector(
  selectNavigationFeature,
  (state: NavigationStoreState) => state.navigationMenuItem
);
