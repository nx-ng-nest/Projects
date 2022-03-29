import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, map } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { NavigationMenuItem, NavigationService } from './store';
import { SubSink } from 'subsink';
@Component({
  selector: 'projects-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  private readonly subsink = new SubSink();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public navigationService: NavigationService
  ) {}
  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  ngOnInit(): void {
    this.subsink.sink = this.navigationService.navigationItem$.subscribe(
      (i: NavigationMenuItem) => {
        this.navigationService.navigate(i);
      }
    );
  }

  navigationItemClickHandler(p: NavigationMenuItem) {
    this.navigationService.setCurrentlyClickedNavigationMenuItem(p);
    this.navigationService.setCurrentPage(p.pageName);
  }
}
