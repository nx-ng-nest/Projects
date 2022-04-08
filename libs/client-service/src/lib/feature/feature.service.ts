import { Injectable } from '@angular/core';

import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IFeature } from '@projects/interface';

import { BaseCollectionService } from '../base';

@Injectable({ providedIn: 'root' })
export class FeatureService extends BaseCollectionService<IFeature> {
  constructor(elementFactory: EntityCollectionServiceElementsFactory) {
    super('Feature', elementFactory);
  }
}
