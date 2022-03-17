import { Injectable } from '@angular/core';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

import { Product } from './product.entity';

@Injectable({ providedIn: 'root' })
export class ProductService extends EntityCollectionServiceBase<Product> {
  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', elementsFactory);
  }
}
