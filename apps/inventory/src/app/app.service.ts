import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from '@projects/interface';
import { actions } from './app-store.actions';

@Injectable()
export class AppService {
  constructor(private store: Store) {}

  setPageName(currentPage: string) {
    this.store.dispatch(actions.SET_CURRENT_PAGE({ currentPage }));
  }

  setUser(user: IUser) {
    this.store.dispatch(actions.SET_USER({ user }));
  }
}
