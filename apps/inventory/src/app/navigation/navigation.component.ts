import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import {
  Observable,
  of,
} from 'rxjs';
import {
  map,
  shareReplay,
} from 'rxjs/operators';

@Component({
  selector: 'projects-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  pageName$ = of('');
  public readonly isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
}
