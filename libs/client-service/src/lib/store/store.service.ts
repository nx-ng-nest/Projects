import { Injectable } from '@angular/core';

import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IStore } from '@projects/interface';

import { BaseCollectionService } from '../base';

@Injectable({ providedIn: 'root' })
export class StoreService extends BaseCollectionService<IStore> {
  constructor(elementFactory: EntityCollectionServiceElementsFactory) {
    super('Store', elementFactory);
  }
}
