import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BaseDataService,
  Store,
} from '@projects/models';

@Injectable()
export class StoreService extends BaseDataService<Store> {
  constructor(@InjectRepository(Store) storeRepo: Repository<Store>) {
    super(storeRepo);
  }
}
