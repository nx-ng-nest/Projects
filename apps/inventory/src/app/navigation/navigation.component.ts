import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, map } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AppUpState } from '../app-store';
import { actions } from '../app-store.actions';
import { navigationData as NAVIGATION_DATA } from './navigation-data';
@Component({
  selector: 'projects-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  navigationData = NAVIGATION_DATA;
  currentPage$!: Observable<string | undefined>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppUpState>
  ) {}

  ngOnInit(): void {
    this.currentPage$ = this.store.pipe(map((e) => e.app.currentPage));
    this.store.dispatch(actions.SET_CURRENT_PAGE({ currentPage: 'Inventory' }));
  }
}
