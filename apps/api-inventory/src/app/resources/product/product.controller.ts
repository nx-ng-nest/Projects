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
import { ReadPermission, Secure, WritePermission } from '@projects/auth';
import {
  CreateValidationPipe,
  Product,
  ProductCreateDTO,
  UpdateValidationPipe,
} from '@projects/models';

import { ProductService } from './product.service';
import { IProductCreateDTO } from '@projects/interface';

const SINGULAR = 'product';
const PLURAL = 'products';

@Secure()
@ApiTags(ProductController.name)
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  get(@Query() options: FindManyOptions) {
    return this.productService.find(options);
  }

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: ProductCreateDTO) {
    const newProduct = this.productService.save(body);
    return newProduct;
  }

  @WritePermission(SINGULAR)
  @Patch(SINGULAR + '/:id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateValidationPipe) updated: ProductCreateDTO
  ) {
    return this.productService.update(id, updated);
  }

  @WritePermission(SINGULAR)
  @Delete(SINGULAR + '/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
