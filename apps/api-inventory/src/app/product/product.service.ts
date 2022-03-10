import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@projects/services';
import { FindManyOptions } from '@projects/utils';

import { ProductDTO } from './product.dto';
import { Product } from './product.entity';

export class ProductService extends RepositoryService<
  Product,
  ProductDTO,
  FindManyOptions
> {
  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>
  ) {
    super(productRepo);
  }
}
