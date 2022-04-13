import { Provider } from '@angular/core';
import { Route } from '@angular/router';

import { CrudModuleTokens } from './crud-tokens.enum';
import { CrudToolbarOptions } from './crud-toolbar/crud-toolbar-options';

export function addToolbarOptionsToModule(): Route {
  return {
    path: '',
    loadChildren: () =>
      import('./crud-toolbar/crud-toolbar.module').then(
        (m) => m.CrudToolbarModule
      ),
    outlet: 'crud-toolbar',
  };
}

export function addNavItemsOptionsToModule(): Route {
  return {
    path: '',
    loadChildren: () =>
      import('./crud-nav/crud-nav.module').then((m) => m.CrudNavModule),
    outlet: 'crud-navitems',
  };
}

export function provideToolbarOptionsToModule(dep: CrudModuleTokens): Provider {
  return {
    deps: [dep],
    provide: CrudModuleTokens.TOOLBAR_OPTIONS,
    useFactory: (options: CrudToolbarOptions) => {
      return options;
    },
  };
}
