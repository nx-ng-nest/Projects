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

import { CustomerDTO } from './customer.dto';
import { CustomerService } from './customer.service';

@ApiTags(CustomerController.name)
@UseGuards(AuthJwtGuard)
@Controller()
export class CustomerController {
  constructor(private readonly customerRepo: CustomerService) {}

  @Get('customers')
  @Permission({ method: 'GET', resource: 'customer' })
  getAll(@Query() query: Record<string, any>) {
    return this.customerRepo.getAll(query);
  }

  @Post('customers')
  @Permission({ method: 'GET', resource: 'customer' })
  getAllWithQuery(@Body() query: FindManyOptions) {
    return this.customerRepo.getAllWithQuery(query);
  }

  @Get('customer/:id')
  @Permission({ method: 'GET', resource: 'customer' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.customerRepo.getById(id);
  }

  @Post('customer')
  @Permission({ method: 'POST', resource: 'customer' })
  createOne(@Body(ValidateCreate) body: CustomerDTO) {
    return this.customerRepo.createOne(body);
  }

  @Patch('customer/:id')
  @Permission({ method: 'PATCH', resource: 'customer' })
  patchOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: CustomerDTO
  ) {
    return this.customerRepo.patchOne(id, body);
  }

  @Delete('customer/:id')
  @Permission({ method: 'DELETE', resource: 'customer' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.customerRepo.deleteOne(id);
  }
}
