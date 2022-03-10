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

import { PriceDTO } from './price.dto';
import { PriceService } from './price.service';

@ApiTags(PriceController.name)
@UseGuards(AuthJwtGuard)
@Controller()
export class PriceController {
  constructor(private readonly priceRepo: PriceService) {}

  @Get('prices')
  @Permission({ method: 'GET', resource: 'price' })
  getAll(@Query() query: Record<string, any>) {
    return this.priceRepo.getAll(query);
  }

  @Post('prices')
  @Permission({ method: 'GET', resource: 'price' })
  getAllWithQuery(@Body() query: FindManyOptions) {
    return this.priceRepo.getAllWithQuery(query);
  }

  @Get('price/:id')
  @Permission({ method: 'GET', resource: 'price' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.priceRepo.getById(id);
  }

  @Post('price')
  @Permission({ method: 'POST', resource: 'price' })
  createOne(@Body(ValidateCreate) body: PriceDTO) {
    return this.priceRepo.createOne(body);
  }

  @Patch('price/:id')
  @Permission({ method: 'PATCH', resource: 'price' })
  patchOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: PriceDTO
  ) {
    return this.priceRepo.patchOne(id, body);
  }

  @Delete('price/:id')
  @Permission({ method: 'DELETE', resource: 'price' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.priceRepo.deleteOne(id);
  }
}
