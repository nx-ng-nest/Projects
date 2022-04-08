import { Injectable } from '@angular/core';

import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IUser } from '@projects/interface';

import { BaseCollectionService } from '../base';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseCollectionService<IUser> {
  constructor(elementFactory: EntityCollectionServiceElementsFactory) {
    super('User', elementFactory);
  }
}
