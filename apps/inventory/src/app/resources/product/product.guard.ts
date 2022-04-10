import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import {
  Observable,
  of,
} from 'rxjs';

import { UserCanActivate } from '../../crud/user-can-activate.guard';

@Injectable({ providedIn: 'root' })
export class ProductGuard implements UserCanActivate {
  constructor(private snack: MatSnackBar) {}
  canRead(): Observable<boolean> {
    return of(true)
  }

  canWrite(): Observable<boolean> {
    return of(true)
  }

  canDelete(): Observable<boolean> {
    return of(false)
  }

  canUpdate(): Observable<boolean> {
    return of(false)
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.snack.open('You are NOT autorized for this operation!', '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
    return false;
  }
}
