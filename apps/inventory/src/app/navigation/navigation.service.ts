import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from './route-path.enum';

@Injectable()
export class NavigationService {
  constructor(private router: Router) {}

  viewProducts() {
    this.router.navigate([RoutePath.VIEW_PRODUCTS]);
  }

  editProducts() {
    this.router.navigate([RoutePath.EDIT_PRODUCTS]);
  }
}
