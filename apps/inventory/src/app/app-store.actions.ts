import {
  createAction,
  props,
} from '@ngrx/store';

export const actions = {
  SET_CURRENT_PAGE: createAction(
    '[APP STATE] SET CURRENT PAGE',
    props<{ currentPage: string }>()
  ),
  SET_USER: createAction(
    '[APP STATE] SET USER',
    props<{ user: { username: string; permissions: string[] } }>()
  ),
};
