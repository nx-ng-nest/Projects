import { Injectable } from '@angular/core';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IProduct } from '@projects/interface';
import { BehaviorSubject } from 'rxjs';
import { SubSink } from 'subsink';

@Injectable({ providedIn: 'root' })
export class ProductService extends EntityCollectionServiceBase<IProduct> {
  selectedItems$ = new BehaviorSubject<IProduct[]>([]);
  subsink = new SubSink();
  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', elementsFactory);
  }

  selectItem(id: IProduct) {
    this.selectedItems$.next([...this.selectedItems$.getValue(), id]);
  }

  deselectItem(id: number) {
    const items = this.selectedItems$.getValue();
    const itemIndex = items.findIndex((e) => e.id == id);

    const __ = items.splice(itemIndex, 1);
    this.selectedItems$.next(items);
  }

  selectAllItems(filteredItems: IProduct[]) {
    this.selectedItems$.next(filteredItems);
  }

  deselectAllItems() {
    this.selectedItems$.next([]);
  }
}
