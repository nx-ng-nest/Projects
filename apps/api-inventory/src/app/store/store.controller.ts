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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthJwtGuard,
  Permission,
} from '@projects/auth';
import { FindManyOptions } from '@projects/utils';
import {
  ValidateCreate,
  ValidateUpdate,
} from '@projects/validation';

import { StoreDTO } from './store.dto';
import { StoreService } from './store.service';

@ApiTags(StoreController.name)
@UseGuards(AuthJwtGuard)
@Controller()
export class StoreController {
  constructor(private readonly storeRepo: StoreService) {}

  @Get('stores')
  @Permission({ method: 'GET', resource: 'store' })
  getAll(@Query() query: Record<string, any>) {
    return this.storeRepo.getAll(query);
  }

  @Post('stores')
  @Permission({ method: 'GET', resource: 'store' })
  getAllWithQuery(@Body() query: FindManyOptions) {
    return this.storeRepo.getAllWithQuery(query);
  }

  @Get('store/:id')
  @Permission({ method: 'GET', resource: 'store' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.storeRepo.getById(id);
  }

  @Post('store')
  @Permission({ method: 'POST', resource: 'store' })
  createOne(@Body(ValidateCreate) body: StoreDTO) {
    return this.storeRepo.createOne(body);
  }

  @Patch('store/:id')
  @Permission({ method: 'PATCH', resource: 'store' })
  patchOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: StoreDTO
  ) {
    return this.storeRepo.patchOne(id, body);
  }

  @Delete('store/:id')
  @Permission({ method: 'DELETE', resource: 'store' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.storeRepo.deleteOne(id);
  }
}
