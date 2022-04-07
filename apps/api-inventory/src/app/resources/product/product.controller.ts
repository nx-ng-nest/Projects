import { Response } from 'express';

import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ReadPermission,
  Secure,
  WritePermission,
} from '@projects/auth';
import {
  CreateValidationPipe,
  Product,
  UpdateValidationPipe,
} from '@projects/models';

import { ProductService } from './product.service';

const SINGULAR = 'product';
const BYID = 'product/:id';
const BYUUID = 'product/uuid/:uuid';
const PLURAL = 'products';
const STREAM = 'product-stream';
const COLUMNS = 'product-columns';

@Secure()
@ApiTags(ProductControllerRead.name)
@UseInterceptors(CacheInterceptor)
@Controller()
export class ProductControllerRead {
  constructor(private readonly productService: ProductService) {}

  @ReadPermission(SINGULAR)
  @Get(STREAM)
  async stream(@Res() res: Response) {
    this.productService.stream(res);
  }

  @ReadPermission(SINGULAR)
  @Get(COLUMNS)
  async columns() {
    return this.productService.columns();
  }

  @ReadPermission(SINGULAR)
  @Get(BYID)
  getOneById(@Param('id') id: number) {
    return this.productService.findOne({ where: { id } });
  }
  @ReadPermission(SINGULAR)
  @Get(BYUUID)
  getOneByUUID(@Param('uuid') uuid: number) {
    return this.productService.findOne({ where: { uuid } });
  }

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  async get() {
    return this.productService.find();
  }
}

@Secure()
@ApiTags(ProductControllerWrite.name)
@Controller()
export class ProductControllerWrite {
  constructor(private readonly productService: ProductService) {}

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: Product) {
    const newProduct = this.productService.save(body);
    return newProduct;
  }

  @WritePermission(SINGULAR)
  @Patch(SINGULAR + '/:id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateValidationPipe) updated: Product
  ) {
    return this.productService.update(id, updated);
  }

  @WritePermission(SINGULAR)
  @Delete(SINGULAR + '/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
