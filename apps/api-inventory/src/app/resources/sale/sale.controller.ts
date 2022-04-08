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
  Sale,
  UpdateValidationPipe,
} from '@projects/models';

import { SaleService } from './sale.service';

const SINGULAR = 'sale';
const BYID = 'sale/:id';
const BYUUID = 'sale/uuid/:uuid';
const PLURAL = 'sales';
const STREAM = 'sale-stream';
const COLUMNS = 'sale-columns';

@Secure()
@ApiTags(SaleControllerRead.name)
@UseInterceptors(CacheInterceptor)
@Controller()
export class SaleControllerRead {
  constructor(private readonly saleService: SaleService) {}

  @ReadPermission(SINGULAR)
  @Get(STREAM)
  async stream(@Res() res: Response) {
    this.saleService.stream(res);
  }

  @ReadPermission(SINGULAR)
  @Get(COLUMNS)
  async columns() {
    return this.saleService.columns();
  }

  @ReadPermission(SINGULAR)
  @Get(BYID)
  getOneById(@Param('id') id: number) {
    return this.saleService.findOne({ where: { id } });
  }

  @ReadPermission(SINGULAR)
  @Get(BYUUID)
  getOneByUUID(@Param('uuid') uuid: number) {
    return this.saleService.findOne({ where: { uuid } });
  }

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  async get() {
    return this.saleService.find();
  }
}

@Secure()
@ApiTags(SaleControllerWrite.name)
@Controller()
export class SaleControllerWrite {
  constructor(private readonly saleService: SaleService) {}

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: Sale) {
    const newSale = this.saleService.save(body);
    return newSale;
  }

  @WritePermission(SINGULAR)
  @Patch(SINGULAR + '/:id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateValidationPipe) updated: Sale
  ) {
    return this.saleService.update(id, updated);
  }

  @WritePermission(SINGULAR)
  @Delete(SINGULAR + '/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.saleService.delete(id);
  }
}
