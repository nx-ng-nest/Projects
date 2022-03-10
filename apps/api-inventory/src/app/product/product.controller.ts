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

import { ProductDTO } from './product.dto';
import { ProductService } from './product.service';

@ApiTags(ProductController.name)
@UseGuards(AuthJwtGuard)
@Controller()
export class ProductController {
  constructor(private readonly productRepo: ProductService) {}

  @Get('products')
  @Permission({ method: 'GET', resource: 'product' })
  getAll(@Query() query: Record<string, any>) {
    return this.productRepo.getAll(query);
  }

  @Post('products')
  @Permission({ method: 'GET', resource: 'product' })
  getAllWithQuery(@Body() query: FindManyOptions) {
    return this.productRepo.getAllWithQuery(query);
  }

  @Get('product/:id')
  @Permission({ method: 'GET', resource: 'product' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.productRepo.getById(id);
  }

  @Post('product')
  @Permission({ method: 'POST', resource: 'product' })
  createOne(@Body(ValidateCreate) body: ProductDTO) {
    return this.productRepo.createOne(body);
  }

  @Patch('product/:id')
  @Permission({ method: 'PATCH', resource: 'product' })
  patchOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: ProductDTO
  ) {
    return this.productRepo.patchOne(id, body);
  }

  @Delete('product/:id')
  @Permission({ method: 'DELETE', resource: 'product' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.productRepo.deleteOne(id);
  }
}
