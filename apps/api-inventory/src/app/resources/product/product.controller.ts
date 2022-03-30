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
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ReadPermission, Secure, WritePermission } from '@projects/auth';
import {
  CreateValidationPipe,
  Product,
  UpdateValidationPipe,
} from '@projects/models';
import { Transform } from 'class-transformer';
import { ILike } from 'typeorm';

import { ProductService } from './product.service';

const SINGULAR = 'product';
const PLURAL = 'products';

class ProductQueryDTO {
  @ApiProperty({ required: false })
  take: number;

  @ApiProperty({ required: false })
  skip: number;

  @ApiProperty({ required: false })
  id?: number;

  @ApiProperty({ required: false })
  uuid: string;

  @ApiProperty({ required: false })
  @Transform(({ value }) => value && ILike(`%${value}%`))
  q?: string;
}

@Secure()
@ApiTags(ProductController.name)
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  get(@Query(UpdateValidationPipe) query: ProductQueryDTO) {
    if (query.id) {
      return this.productService.find({ where: { id: query.id } });
    }

    if (query.uuid) {
      return this.productService.find({
        where: [{ uuid: query.uuid }, { id2: query.uuid }, { id3: query.uuid }],
      });
    }

    if (query.q) {
      return this.productService.find({
        where: [{ name: query.q }, { description: query.q }],
      });
    }

    return this.productService.find();
  }

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: Product) {
    const newProduct = this.productService.save(body);
    return newProduct;
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
