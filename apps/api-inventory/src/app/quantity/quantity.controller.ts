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

import { QuantityDTO } from './quantity.dto';
import { QuantityService } from './quantity.service';

@ApiTags(QuantityController.name)
@UseGuards(AuthJwtGuard)
@Controller()
export class QuantityController {
  constructor(private readonly quantityRepo: QuantityService) {}

  @Get('quantitys')
  @Permission({ method: 'GET', resource: 'quantity' })
  getAll(@Query() query: Record<string, any>) {
    return this.quantityRepo.getAll(query);
  }

  @Post('quantitys')
  @Permission({ method: 'GET', resource: 'quantity' })
  getAllWithQuery(@Body() query: FindManyOptions) {
    return this.quantityRepo.getAllWithQuery(query);
  }

  @Get('quantity/:id')
  @Permission({ method: 'GET', resource: 'quantity' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.quantityRepo.getById(id);
  }

  @Post('quantity')
  @Permission({ method: 'POST', resource: 'quantity' })
  createOne(@Body(ValidateCreate) body: QuantityDTO) {
    return this.quantityRepo.createOne(body);
  }

  @Patch('quantity/:id')
  @Permission({ method: 'PATCH', resource: 'quantity' })
  patchOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: QuantityDTO
  ) {
    return this.quantityRepo.patchOne(id, body);
  }

  @Delete('quantity/:id')
  @Permission({ method: 'DELETE', resource: 'quantity' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.quantityRepo.deleteOne(id);
  }
}
