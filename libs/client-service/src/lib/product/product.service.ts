import { Injectable } from '@angular/core';

import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IProduct } from '@projects/interface';

import { BaseCollectionService } from '../base';
import {
  CATEGORY_PLURAL_NAME,
  CategoryService,
} from '../category';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseCollectionService<IProduct> {
  constructor(
    elementFactory: EntityCollectionServiceElementsFactory,
    categoryService: CategoryService
  ) {
    super('Product', elementFactory, {
      [CATEGORY_PLURAL_NAME]: categoryService,
    });
  }
}
