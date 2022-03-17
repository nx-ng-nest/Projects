import { Injectable } from '@nestjs/common';
import {
  readPermission,
  writePermission,
} from '@projects/auth';

import { ProductService } from './resources';
import { CategoryService } from './resources/category';
import { StoreService } from './resources/store';
import { UserService } from './resources/user';

@Injectable()
export class AppService {
  constructor(
    private readonly storeService: StoreService,
    private readonly userService: UserService,
    protected readonly productService: ProductService,
    protected readonly categoryService: CategoryService
  ) {}

  async initStore() {
    const store = await this.storeService.save({ name: 'Base Store' });
    const user = await this.userService.save({
      username: 'nxng.dev@gmail.com',
      password: 'password',
      permissions: [readPermission('product'), writePermission('product')],

    });

    const product = await this.productService.save({
      name: 'Sample Product',
      description: 'Product description',
      barcode: '123456789123',
    });

    const toyCategory = await this.categoryService.save({ name: 'Toy' });
    const consoleCategory = await this.categoryService.save({
      name: 'Console',
    });
  }
  getData(): { message: string } {
    return { message: 'Welcome to api-inventory!' };
  }
}
