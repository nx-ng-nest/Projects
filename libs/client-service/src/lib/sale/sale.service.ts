import { Injectable } from '@angular/core';

import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { ISale } from '@projects/interface';

import { BaseCollectionService } from '../base';

@Injectable({ providedIn: 'root' })
export class SaleService extends BaseCollectionService<ISale> {
  constructor(elementFactory: EntityCollectionServiceElementsFactory) {
    super('Sale', elementFactory);
  }
}
