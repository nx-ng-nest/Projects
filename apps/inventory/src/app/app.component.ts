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
    const lastPageStr = localStorage.getItem('lastPage');
    if (lastPageStr) {
      const lastPage = JSON.parse(lastPageStr) as any;
      this.navigationService.navigate(lastPage);
    }

    this.subsink.sink = this.lastNavigationItem$.subscribe((d) => {
      localStorage.setItem('lastPage', JSON.stringify(d));
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
