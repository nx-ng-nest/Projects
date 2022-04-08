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
  Feature,
  UpdateValidationPipe,
} from '@projects/models';

import { FeatureService } from './feature.service';

const SINGULAR = 'feature';
const BYID = 'feature/:id';
const BYUUID = 'feature/uuid/:uuid';
const PLURAL = 'features';
const STREAM = 'feature-stream';
const COLUMNS = 'feature-columns';

@Secure()
@ApiTags(FeatureControllerRead.name)
@UseInterceptors(CacheInterceptor)
@Controller()
export class FeatureControllerRead {
  constructor(private readonly featureService: FeatureService) {}

  @ReadPermission(SINGULAR)
  @Get(STREAM)
  async stream(@Res() res: Response) {
    this.featureService.stream(res);
  }

  @ReadPermission(SINGULAR)
  @Get(COLUMNS)
  async columns() {
    return this.featureService.columns();
  }

  @ReadPermission(SINGULAR)
  @Get(BYID)
  getOneById(@Param('id') id: number) {
    return this.featureService.findOne({ where: { id } });
  }

  @ReadPermission(SINGULAR)
  @Get(BYUUID)
  getOneByUUID(@Param('uuid') uuid: number) {
    return this.featureService.findOne({ where: { uuid } });
  }

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  async get() {
    return this.featureService.find();
  }
}

@Secure()
@ApiTags(FeatureControllerWrite.name)
@Controller()
export class FeatureControllerWrite {
  constructor(private readonly featureService: FeatureService) {}

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: Feature) {
    const newFeature = this.featureService.save(body);
    return newFeature;
  }

  @WritePermission(SINGULAR)
  @Patch(SINGULAR + '/:id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateValidationPipe) updated: Feature
  ) {
    return this.featureService.update(id, updated);
  }

  @WritePermission(SINGULAR)
  @Delete(SINGULAR + '/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.featureService.delete(id);
  }
}
