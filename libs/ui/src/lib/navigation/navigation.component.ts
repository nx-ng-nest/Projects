import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {
  map,
  Observable,
} from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { SubSink } from 'subsink';

import {
  NavigationMenuItem,
  NavigationService,
} from './store';

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

  goHome() {
    this.navigationService.navigate({
      icon: '',
      label: 'Home',
      pageName: 'Home',
      path: '',
    });
  }
}
