import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseDataService, ProductDetail } from '@projects/models';

@Injectable()
export class ProductDetailService extends BaseDataService<ProductDetail> {
  constructor(
    @InjectRepository(ProductDetail)
    productDetailRepo: Repository<ProductDetail>
  ) {
    super(productDetailRepo);
  }

  // async getProductDetailsByStore(storeId: number) {
  //   // return this.repo
  //   //   .createQueryBuilder('product_detail')
  //   //   .leftJoinAndSelect('product_detail.store', 'store')
  //   //   .leftJoinAndSelect('product_detail.product', 'product')
  //   //   .where('store.id = :storeId', { storeId })
  //   //   .select('*')
  //   //   .execute();

  //   const founds = await this.find();
  //   return founds.filter((e) => e.store.id == storeId);
  // }
}
