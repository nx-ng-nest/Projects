import {
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { categoryList } from './category-list';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule implements OnModuleInit {
  constructor(private readonly categoryService: CategoryService) {}
  async onModuleInit() {
    for (const name of categoryList()) {
      await this.categoryService.createOne({ name });
    }
  }
}
