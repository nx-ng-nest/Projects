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

  ngOnInit(): void {
    this.subsink.sink = this.navigationService.navigationItem$.subscribe(
      (data) => {
        console.log(data);
        if (data) {
          this.navigationService.navigate(data);
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  navigationItemClickHandler(p: NavigationMenuItem) {
    this.navigationService.setCurrentlyClickedNavigationMenuItem(p);
    this.navigationService.setCurrentPage(p.pageName);
  }
}
