import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'projects-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  public readonly pageName$ = this.activatedRoute.data.pipe(
    tap((k) => console.log(k)),
    map((e) => e['pageName'])
  );

  public readonly isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly breakpointObserver: BreakpointObserver
  ) {}
}
