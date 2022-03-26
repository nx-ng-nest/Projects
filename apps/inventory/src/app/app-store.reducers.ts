import {
  createReducer,
  on,
} from '@ngrx/store';

import { AppState } from './app-store';
import { actions } from './app-store.actions';

const featureReducer = createReducer<AppState>(
  {},
  on(
    actions.SET_CURRENT_PAGE,
    (state: AppState, action: Pick<AppState, 'currentPage'>) => {
      return { ...state, currentPage: action.currentPage };
    }
  )
);
