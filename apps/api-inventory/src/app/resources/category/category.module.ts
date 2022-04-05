import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@projects/models';

import {
  CategoryControllerRead,
  CategoryControllerWrite,
} from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryControllerRead, CategoryControllerWrite],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
