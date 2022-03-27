import { Injectable } from '@angular/core';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IProduct } from '@projects/interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService extends EntityCollectionServiceBase<IProduct> {
  selectedItems$ = new BehaviorSubject<number[]>([]);

  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', elementsFactory);
  }

  selectItem(id: number) {
    this.selectedItems$.next([...this.selectedItems$.getValue(), id]);
  }

  deselectItem(id: number) {
    const items = this.selectedItems$.getValue();
    const itemIndex = items.indexOf(id);
    const __ = items.splice(itemIndex, 1);
    this.selectedItems$.next(items);
  }
}
