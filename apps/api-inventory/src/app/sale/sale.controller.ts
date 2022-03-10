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

import { SaleDTO } from './sale.dto';
import { SaleService } from './sale.service';

@ApiTags(SaleController.name)
@UseGuards(AuthJwtGuard)
@Controller()
export class SaleController {
  constructor(private readonly saleRepo: SaleService) {}

  @Get('sales')
  @Permission({ method: 'GET', resource: 'sale' })
  getAll(@Query() query: Record<string, any>) {
    return this.saleRepo.getAll(query);
  }

  @Post('sales')
  @Permission({ method: 'GET', resource: 'sale' })
  getAllWithQuery(@Body() query: FindManyOptions) {
    return this.saleRepo.getAllWithQuery(query);
  }

  @Get('sale/:id')
  @Permission({ method: 'GET', resource: 'sale' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.saleRepo.getById(id);
  }

  @Post('sale')
  @Permission({ method: 'POST', resource: 'sale' })
  createOne(@Body(ValidateCreate) body: SaleDTO) {
    return this.saleRepo.createOne(body);
  }

  @Patch('sale/:id')
  @Permission({ method: 'PATCH', resource: 'sale' })
  patchOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: SaleDTO
  ) {
    return this.saleRepo.patchOne(id, body);
  }

  @Delete('sale/:id')
  @Permission({ method: 'DELETE', resource: 'sale' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.saleRepo.deleteOne(id);
  }
}
