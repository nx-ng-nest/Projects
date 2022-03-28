import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IProduct } from '@projects/interface';
import { BaseCollectionService } from '../base';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseCollectionService<IProduct> {
  selectedItems$ = new BehaviorSubject<IProduct[]>([]);
  constructor(elementFactory: EntityCollectionServiceElementsFactory) {
    super('Product', elementFactory);
  }
}
