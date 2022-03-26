import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BaseDataService,
  Product,
} from '@projects/models';

import { ProductDetailService } from '../product-detail';
import { ProductCreateDTO } from './product-create.dto';

@Injectable()
export class ProductService extends BaseDataService<Product> {
  constructor(
    @InjectRepository(Product) productRepo: Repository<Product>,
    private readonly productDetailService: ProductDetailService
  ) {
    super(productRepo);
  }

  async createProduct(product: ProductCreateDTO) {
    const createdProduct = await this.save(product.product);
    const createdProductDetails = await this.productDetailService.save({
      ...product.productDetail,
      store: { id: 1 },
      product: { id: createdProduct.id },
    });

    return {
      ...createdProductDetails,
      ...createdProduct,
    };
  }

  async getProducts(storeId: number) {
    return this.productDetailService.getProductDetailsByStore(storeId);
  }
}
