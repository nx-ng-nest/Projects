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
  WritePermission,
} from '@projects/auth';
import {
  CreateValidationPipe,
  Product,
  UpdateValidationPipe,
  User,
} from '@projects/models';

import { ProductService } from './product.service';

const SINGULAR = 'product';
const PLURAL = 'products';

@ApiTags(ProductController.name)
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(PLURAL)
  @ReadPermission(SINGULAR)
  get(@Query() options: FindManyOptions) {
    return this.productService.find(options);
  }

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: Product) {
    return this.productService.save(body);
  }

  @Patch(SINGULAR + '/:id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateValidationPipe) updated: User
  ) {
    return this.productService.update(id, updated);
  }

  @Delete(SINGULAR + '/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
