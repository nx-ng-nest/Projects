import { Response } from 'express';
import { FindManyOptions } from 'typeorm';

import {
  BadRequestException,
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
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

import { ProductService } from './product.service';

const SINGULAR = 'product';
const BYID = 'product/:id';
const PLURAL = 'products';

class CheckOneOptions<T> {
  @ApiProperty({ required: false })
  uniqueKey: string;
  @ApiProperty({ required: false })
  uniqueValue: string;
}

class FindAllQueryOptions<T> {
  @ApiProperty({ required: false })
  isStream: boolean;

  @ApiProperty({ required: false })
  pageIndex: number;

  @ApiProperty({ required: false })
  pageSize: number;
}
@Secure()
@ApiTags(ProductControllerRead.name)
@UseInterceptors(CacheInterceptor)
@Controller()
export class ProductControllerRead {
  constructor(private readonly productService: ProductService) {}

  @ReadPermission(SINGULAR)
  @Get(BYID)
  findOneById(@Param('id') id: string) {
    return this.productService.findOne({
      where: [{ id }, { uuid: id }, { id1: id }, { id2: id }, { id3: id }],
    });
  }

  @ReadPermission(SINGULAR)
  @Get(SINGULAR)
  checkOne(@Query() options: CheckOneOptions<Product>) {
    if (options.uniqueKey) {
      if (options.uniqueValue) {
        return this.productService.isUnique({
          [options.uniqueKey]: options.uniqueValue,
        });
      }
      throw new BadRequestException(
        'uniqueKey must be used with uniqueValue parameter!'
      );
    }
    throw new BadRequestException(
      'The route does not allow request with no query options!'
    );
  }

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  async findAll(
    @Query() options: FindAllQueryOptions<Product>,
    @Res() res: Response
  ) {
    const take = options.pageSize;
    const skip = options.pageIndex * take;

    const queryOptions: FindManyOptions = take && skip ? { take, skip } : {};
    
    if (options.isStream) {
      return this.productService.stream(res, queryOptions);
    }

    const result = await this.productService.find(queryOptions);
    res.send(result);
  }
}

@Secure()
@ApiTags(ProductControllerWrite.name)
@Controller()
export class ProductControllerWrite {
  constructor(private readonly productService: ProductService) {}

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
