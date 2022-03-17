import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BaseDataService,
  Sale,
} from '@projects/models';

@Injectable()
export class SaleService extends BaseDataService<Sale> {
  constructor(@InjectRepository(Sale) saleRepo: Repository<Sale>) {
    super(saleRepo);
  }
}
