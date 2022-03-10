import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@projects/services';
import { FindManyOptions } from '@projects/utils';

import { PriceDTO } from './price.dto';
import { Price } from './price.entity';

export class PriceService extends RepositoryService<
  Price,
  PriceDTO,
  FindManyOptions
> {
  constructor(
    @InjectRepository(Price) private readonly priceRepo: Repository<Price>
  ) {
    super(priceRepo);
  }
}
