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
  Store,
  UpdateValidationPipe,
} from '@projects/models';

import { StoreService } from './store.service';

const SINGULAR = 'store';
const BYID = 'store/:id';
const BYUUID = 'store/uuid/:uuid';
const PLURAL = 'stores';
const STREAM = 'store-stream';
const COLUMNS = 'store-columns';

@Secure()
@ApiTags(StoreControllerRead.name)
@UseInterceptors(CacheInterceptor)
@Controller()
export class StoreControllerRead {
  constructor(private readonly storeService: StoreService) {}

  @ReadPermission(SINGULAR)
  @Get(STREAM)
  async stream(@Res() res: Response) {
    this.storeService.stream(res);
  }

  @ReadPermission(SINGULAR)
  @Get(COLUMNS)
  async columns() {
    return this.storeService.columns();
  }

  @ReadPermission(SINGULAR)
  @Get(BYID)
  getOneById(@Param('id') id: number) {
    return this.storeService.findOne({ where: { id } });
  }

  @ReadPermission(SINGULAR)
  @Get(BYUUID)
  getOneByUUID(@Param('uuid') uuid: number) {
    return this.storeService.findOne({ where: { uuid } });
  }

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  async get() {
    return this.storeService.find();
  }
}

@Secure()
@ApiTags(StoreControllerWrite.name)
@Controller()
export class StoreControllerWrite {
  constructor(private readonly storeService: StoreService) {}

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: Store) {
    const newStore = this.storeService.save(body);
    return newStore;
  }

  @WritePermission(SINGULAR)
  @Patch(SINGULAR + '/:id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateValidationPipe) updated: Store
  ) {
    return this.storeService.update(id, updated);
  }

  @WritePermission(SINGULAR)
  @Delete(SINGULAR + '/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.storeService.delete(id);
  }
}
