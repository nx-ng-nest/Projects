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
  Category,
  CreateValidationPipe,
  UpdateValidationPipe,
} from '@projects/models';

import { CategoryService } from './category.service';

const SINGULAR = 'category';
const PLURAL = 'categorys';

@Secure()
@ApiTags(CategoryController.name)
@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  get(@Query() options?: FindManyOptions) {
    return this.categoryService.find(options);
  }

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body?: Category) {
    return this.categoryService.save(body);
  }

  @WritePermission(SINGULAR)
  @Patch(SINGULAR + '/:id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateValidationPipe) updated?: Category
  ) {
    return this.categoryService.update(id, updated);
  }

  @WritePermission(SINGULAR)
  @Delete(SINGULAR + '/:id')
  delete(@Param('id', ParseIntPipe) id?: number) {
    return this.categoryService.delete(id);
  }
}
