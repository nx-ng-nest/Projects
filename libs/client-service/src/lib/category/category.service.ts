import { Injectable } from '@angular/core';

import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { ICategory } from '@projects/interface';

import { BaseCollectionService } from '../base';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseCollectionService<ICategory> {
  constructor(elementFactory: EntityCollectionServiceElementsFactory) {
    super('Category', elementFactory);
  }
}
