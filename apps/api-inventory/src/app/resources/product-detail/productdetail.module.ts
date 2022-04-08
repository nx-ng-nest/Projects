import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from '@projects/models';

import {
  ProductDetailControllerRead,
  ProductDetailControllerWrite,
} from './productdetail.controller';
import { ProductDetailService } from './productdetail.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDetail])],
  controllers: [ProductDetailControllerRead, ProductDetailControllerWrite],
  providers: [ProductDetailService],
  exports: [ProductDetailService],
})
export class ProductDetailModule {}
