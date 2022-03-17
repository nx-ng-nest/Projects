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
  Sale,
  UpdateValidationPipe,
} from '@projects/models';

import { SaleService } from './sale.service';

const SINGULAR = 'sale';
const PLURAL = 'sales';

@Secure()
@ApiTags(SaleController.name)
@Controller()
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  get(@Query() options: FindManyOptions) {
    return this.saleService.find(options);
  }

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: Sale) {
    return this.saleService.save(body);
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
