import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BaseDataService,
  Feature,
} from '@projects/models';

@Injectable()
export class FeatureService extends BaseDataService<Feature> {
  constructor(@InjectRepository(Feature) featureRepo: Repository<Feature>) {
    super(featureRepo);
  }
}
