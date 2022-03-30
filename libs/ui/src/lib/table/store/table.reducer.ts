import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { TableStoreEnum } from './table-store.enum';

export interface TableActions<T = any> {
  label: string;
  icon: string;
  event: string;
  row: T;
}
export interface TableStoreState<T = any> {
  [storeName: string]: {
    viewNames: string[];
    views: {
      [viewName: string]: {
        columns: string[];
        displayedColumns: string[];
        actions: TableActions<T>[];
        page: number;
      };
    };
  };
}

export const tableActions = {
  SET_COLUMNS: createAction(
    `[TABLE STORE] SET ACTIONS`,
    props<{ tableName: string; tableView: string; columns: string[] }>()
  ),
};

export const tableReducer = createReducer<TableStoreState>(
  {
    first: {
      viewNames: ['first'],
      views: {
        first: {
          columns: ['selected', 'id', 'name'],
          displayedColumns: ['selected', 'id', 'name'],
          actions: [],
          page: 1,
        },
      },
    },
  },

  on(tableActions.SET_COLUMNS, (state: any, action: any) => {
    console.log(state);
    return state;
  })
);

// Table selectors
const selectNavigationFeature = (appState: any) => {
  return appState[TableStoreEnum.tableStoreName];
};

export const selectTableDisplayedColumns = (
  tableName: string,
  tableView: string
) =>
  createSelector(selectNavigationFeature, (state: TableStoreState) => {
    return state[tableName].views[tableView].displayedColumns;
  });

export const selectTableColumns = (tableName: string, tableView: string) =>
  createSelector(
    selectNavigationFeature,
    (state: TableStoreState) =>
      state && state[tableName].views[tableView].columns
  );

export const selectTableActions = (tableName: string, tableView: string) =>
  createSelector(
    selectNavigationFeature,
    (state: TableStoreState) =>
      state && state[tableName].views[tableView].actions
  );

export const selectTablePage = (tableName: string, tableView: string) =>
  createSelector(
    selectNavigationFeature,
    (state: TableStoreState) => state && state[tableName].views[tableView].page
  );
