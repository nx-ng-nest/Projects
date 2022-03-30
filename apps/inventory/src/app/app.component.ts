import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  NavigationService,
  selectClickedNavigationMenuItem,
  selectNavigationMenu,
} from '@projects/ui';
import { SubSink } from 'subsink';
import { appRoutes } from './app-routes';

@Component({
  selector: 'projects-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  lastNavigationItem$ = this.store.select(selectClickedNavigationMenuItem);
  subsink = new SubSink();
  title = 'inventory';

  constructor(
    private readonly store: Store,
    private readonly navigationService: NavigationService
  ) {}
  ngOnInit(): void {
    this.subsink.sink = this.store.subscribe((data) => {
      localStorage.setItem('store', JSON.stringify(data));
    });
    this.subsink.sink = this.lastNavigationItem$.subscribe((d) => {
      this.navigationService.navigate(d);
    });
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  goToInventoryApp() {
    this.navigationService.navigate(appRoutes.inventory);
  }
}
