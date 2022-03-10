import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@projects/services';
import { FindManyOptions } from '@projects/utils';

import { StoreDTO } from './store.dto';
import { Store } from './store.entity';

export class StoreService extends RepositoryService<
  Store,
  StoreDTO,
  FindManyOptions
> {
  constructor(
    @InjectRepository(Store) private readonly storeRepo: Repository<Store>
  ) {
    super(storeRepo);
  }
}
