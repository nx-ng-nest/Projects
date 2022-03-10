import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@projects/services';
import { FindManyOptions } from '@projects/utils';

import { SaleDTO } from './sale.dto';
import { Sale } from './sale.entity';

export class SaleService extends RepositoryService<
  Sale,
  SaleDTO,
  FindManyOptions
> {
  constructor(
    @InjectRepository(Sale) private readonly saleRepo: Repository<Sale>
  ) {
    super(saleRepo);
  }
}
