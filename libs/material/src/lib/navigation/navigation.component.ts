import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import {
  Component,
  Input,
} from '@angular/core';

import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
} from 'rxjs/operators';

type NavItem = {
  path: string;
  icon: string;
};
@Component({
  selector: 'projects-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  pageName = '';

  @Input() navigationMenu: NavItem[] = [
    { path: 'products', icon: 'inventory' },
    { path: 'users', icon: 'people' },
    { path: 'config', icon: 'settings' },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}
}
