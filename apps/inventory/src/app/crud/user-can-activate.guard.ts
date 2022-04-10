import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';

export abstract class UserCanActivate implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    throw new Error(
      'Please implement the UserCanActivate Abstract class and provide in the module register!'
    );
  }

  canRead(): Observable<boolean> {
    throw new Error('Plese implement the IUserPermission methods! ');
  }

  canWrite(): Observable<boolean> {
    throw new Error('Plese implement the IUserPermission methods! ');
  }

  canDelete(): Observable<boolean> {
    throw new Error(' ');
  }

  canUpdate(): Observable<boolean> {
    throw new Error('Plese implement the IUserPermission methods! ');
  }
}
