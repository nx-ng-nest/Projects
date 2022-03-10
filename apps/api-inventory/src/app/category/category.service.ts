import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@projects/services';
import { FindManyOptions } from '@projects/utils';

import { CategoryDTO } from './category.dto';
import { Category } from './category.entity';

export class CategoryService extends RepositoryService<
  Category,
  CategoryDTO,
  FindManyOptions
> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) {
    super(categoryRepo);
  }
}
