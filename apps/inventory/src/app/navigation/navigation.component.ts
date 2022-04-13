import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';
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
  platformName = Object.entries(this.platform).find(
    ([key, value]) => value === true
  )?.[0];
  public readonly isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Tablet])
    .pipe(
      map((result) => {
        console.log(result.matches);
        return result.matches;
      }),
      shareReplay()
    );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private platform: Platform
  ) {}
}
