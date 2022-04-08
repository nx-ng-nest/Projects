import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BaseDataService,
  ProductDetail,
} from '@projects/models';

@Injectable()
export class ProductDetailService extends BaseDataService<ProductDetail> {
  constructor(
    @InjectRepository(ProductDetail)
    productdetailRepo: Repository<ProductDetail>
  ) {
    super(productdetailRepo);
  }
}
