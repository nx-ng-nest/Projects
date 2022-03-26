import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
} from 'rxjs/operators';

@Component({
  selector: 'projects-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

}
