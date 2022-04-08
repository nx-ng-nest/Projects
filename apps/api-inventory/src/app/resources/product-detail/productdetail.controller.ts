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
  ProductDetail,
  UpdateValidationPipe,
} from '@projects/models';

import { ProductDetailService } from './productdetail.service';

const SINGULAR = 'productdetail';
const BYID = 'productdetail/:id';
const BYUUID = 'productdetail/uuid/:uuid';
const PLURAL = 'productdetails';
const STREAM = 'productdetail-stream';
const COLUMNS = 'productdetail-columns';

@Secure()
@ApiTags(ProductDetailControllerRead.name)
@UseInterceptors(CacheInterceptor)
@Controller()
export class ProductDetailControllerRead {
  constructor(private readonly productdetailService: ProductDetailService) {}

  @ReadPermission(SINGULAR)
  @Get(STREAM)
  async stream(@Res() res: Response) {
    this.productdetailService.stream(res);
  }

  @ReadPermission(SINGULAR)
  @Get(COLUMNS)
  async columns() {
    return this.productdetailService.columns();
  }

  @ReadPermission(SINGULAR)
  @Get(BYID)
  getOneById(@Param('id') id: number) {
    return this.productdetailService.findOne({ where: { id } });
  }

  @ReadPermission(SINGULAR)
  @Get(BYUUID)
  getOneByUUID(@Param('uuid') uuid: number) {
    return this.productdetailService.findOne({ where: { uuid } });
  }

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  async get() {
    return this.productdetailService.find();
  }
}

@Secure()
@ApiTags(ProductDetailControllerWrite.name)
@Controller()
export class ProductDetailControllerWrite {
  constructor(private readonly productdetailService: ProductDetailService) {}

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: ProductDetail) {
    const newProductDetail = this.productdetailService.save(body);
    return newProductDetail;
  }

  @WritePermission(SINGULAR)
  @Patch(SINGULAR + '/:id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateValidationPipe) updated: ProductDetail
  ) {
    return this.productdetailService.update(id, updated);
  }

  @WritePermission(SINGULAR)
  @Delete(SINGULAR + '/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productdetailService.delete(id);
  }
}
