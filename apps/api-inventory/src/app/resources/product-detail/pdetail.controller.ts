import { FindManyOptions } from 'typeorm';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ReadPermission,
  Secure,
  WritePermission,
} from '@projects/auth';
import {
  CreateValidationPipe,
  ProductDetail,
  UpdateValidationPipe,
} from '@projects/models';

import { ProductDetailService } from './product-detail.service';

const SINGULAR = 'productDetail';
const PLURAL = 'productDetails';

@Secure()
@ApiTags(ProductDetailController.name)
@Controller()
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  get(@Query() options: FindManyOptions) {
    return this.productDetailService.find(options);
  }

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: ProductDetail) {
    return this.productDetailService.save(body);
  }

  @WritePermission(SINGULAR)
  @Patch(SINGULAR + '/:id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateValidationPipe) updated: ProductDetail
  ) {
    return this.productDetailService.update(id, updated);
  }

  @WritePermission(SINGULAR)
  @Delete(SINGULAR + '/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productDetailService.delete(id);
  }
}
