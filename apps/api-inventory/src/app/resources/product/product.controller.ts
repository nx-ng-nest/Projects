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
  Product,
  UpdateValidationPipe,
} from '@projects/models';

import { ProductCreateDTO } from './product-create.dto';
import { ProductService } from './product.service';

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
    const newProduct = this.productService.save(body.product);
  }

  @WritePermission(SINGULAR)
  @Post(`create${SINGULAR}`)
  createProduct(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Body() product: ProductCreateDTO
  ) {
    return this.productService.createProduct(product);
  }

  @ReadPermission(SINGULAR)
  @Get(`get${SINGULAR}/:storeId`)
  getProducts(@Param('storeId', ParseIntPipe) storeId: number) {
    return this.productService.getProducts(storeId);
  }

  @WritePermission(SINGULAR)
  @Patch(SINGULAR + '/:id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateValidationPipe) updated: Product
  ) {
    return this.productService.update(id, updated);
  }

  @WritePermission(SINGULAR)
  @Delete(SINGULAR + '/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
