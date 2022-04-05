import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Product,
  ProductDetail,
} from '@projects/models';

import {
  ProductControllerRead,
  ProductControllerWrite,
} from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductDetail])],
  controllers: [ProductControllerRead, ProductControllerWrite],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
