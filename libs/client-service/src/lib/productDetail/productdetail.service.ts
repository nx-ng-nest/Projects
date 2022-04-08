import { Injectable } from '@angular/core';

import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IProductDetail } from '@projects/interface';

import { BaseCollectionService } from '../base';

@Injectable({ providedIn: 'root' })
export class ProductDetailService extends BaseCollectionService<IProductDetail> {
  constructor(elementFactory: EntityCollectionServiceElementsFactory) {
    super('ProductDetail', elementFactory);
  }
}
