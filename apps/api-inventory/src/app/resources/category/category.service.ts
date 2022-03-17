import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BaseDataService,
  Category,
} from '@projects/models';

@Injectable()
export class CategoryService extends BaseDataService<Category> {
  constructor(@InjectRepository(Category) categoryRepo: Repository<Category>) {
    super(categoryRepo);
  }
}
