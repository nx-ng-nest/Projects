import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@projects/services';
import { FindManyOptions } from '@projects/utils';

import { QuantityDTO } from './quantity.dto';
import { Quantity } from './quantity.entity';

export class QuantityService extends RepositoryService<
  Quantity,
  QuantityDTO,
  FindManyOptions
> {
  constructor(
    @InjectRepository(Quantity) private readonly quantityRepo: Repository<Quantity>
  ) {
    super(quantityRepo);
  }
}
