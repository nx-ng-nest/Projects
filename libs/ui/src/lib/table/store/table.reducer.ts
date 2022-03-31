import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { TableStoreEnum } from './table-store.enum';

export interface TableAction<T = any> {
  label: string;
  icon: string;
  event: string;
  row: T;
}

export interface TableStoreState<T = any> {
  columns: string[];
  displayedColumns: string[];
  actions: TableAction<T>[];
  page: number;
}

export const tableActions = {
  SET_COLUMNS: createAction(
    `[TABLE STORE] SET COLUMNS`,
    props<{ columns: string[] }>()
  ),
  SET_DISPLAYED_COLUMNS: createAction(
    `[TABLE STORE] SET DISPLAYED COLUMNS`,
    props<{
      displayedColumns: string[];
    }>()
  ),
  SET_ACTIONS: createAction(
    `[TABLE STORE] SET ACTIONS`,
    props<{
      tableName: string;
      tableViewName: string;
      actions: TableAction[];
    }>()
  ),
};

export const tableReducer = createReducer<TableStoreState>(
  {
    columns: ['selected', 'id', 'name'],
    displayedColumns: ['selected', 'id', 'name'],
    actions: [],
    page: 1,
  },

  on(
    tableActions.SET_COLUMNS,
    (state: TableStoreState, action): TableStoreState => ({
      ...state,
      columns: action.columns,
    })
  ),
  on(
    tableActions.SET_DISPLAYED_COLUMNS,
    (state: TableStoreState, action): TableStoreState => ({
      ...state,
      displayedColumns: action.displayedColumns,
    })
  )
);

// Table selectors
const selectNavigationFeature = (appState: any) => {
  return appState[TableStoreEnum.tableStoreName];
};

export const selectTableDisplayedColumns = createSelector(
  selectNavigationFeature,
  (state: TableStoreState) => state.displayedColumns
);

export const selectTableColumns = createSelector(
  selectNavigationFeature,
  (state: TableStoreState) => state && state.columns
);

export const selectTableActions = createSelector(
  selectNavigationFeature,
  (state: TableStoreState) => state && state.actions
);

export const selectTablePage = createSelector(
  selectNavigationFeature,
  (state: TableStoreState) => state && state.page
);
