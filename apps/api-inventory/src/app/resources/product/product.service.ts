import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseDataService, Product } from '@projects/models';

@Injectable()
export class ProductService extends BaseDataService<Product> {
  constructor(@InjectRepository(Product) productRepo: Repository<Product>) {
    super(productRepo);
  }
}
