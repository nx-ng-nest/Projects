import { commerce } from 'faker';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  readPermission,
  writePermission,
} from '@projects/auth';
import {
  IID,
  IProduct,
} from '@projects/interface';
import {
  Category,
  Product,
  User,
} from '@projects/models';

function randomItem(items: any[]): any {
  return items[Math.floor(Math.random() * items.length - 1)];
}

function fakeProduct(categories?: IID[]): IProduct {
  return {
    uuid: v4(),
    name: commerce.productName() + Math.floor(Math.random() * 2000),
    description: commerce.productDescription(),
    features: [
      {
        key: 'color',
        value: 'red',
      },
    ],
    categories,
  };
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product) private productService: Repository<Product>,
    @InjectRepository(User) private userService: Repository<User>,
    @InjectRepository(Category) private categoryService: Repository<Category>
  ) {}

  async initStore() {
    // create stores

    // const store1 = await this.storeService.save({ name: 'Houston 1' });
    // const store2 = await this.storeService.save({ name: 'Victoria 2' });
    // const store3 = await this.storeService.save({ name: 'Baumant 3' });
    // const store4 = await this.storeService.save({ name: 'Lake Jackson 4' });
    // const store5 = await this.storeService.save({ name: 'Killen 1' });
    // const store6 = await this.storeService.save({ name: 'Killen 2' });

    const cat1 = await this.categoryService.save({ name: 'Technology' });
    const cat2 = await this.categoryService.save({ name: 'Plush' });
    const cat3 = await this.categoryService.save({ name: 'Console' });
    const cat4 = await this.categoryService.save({ name: 'Accessories' });
    const cat5 = await this.categoryService.save({ name: 'Drones' });

    function randCategory() {
      return randomItem([cat1, cat2, cat3, cat4, cat5]);
    }

    for (let i = 0; i < 1000; i++) {
      const catx = randCategory();
      const catx1 = randCategory();
      const catx2 = randCategory();
      const product = fakeProduct([catx, catx1, catx2]);
      try {
        await this.productService.save(product);
      } catch (err) {
        continue;
      }
    }

    const user = await this.userService.save({
      username: 'nxng.dev@gmail.com',
      password: 'MyStrongPassword!1',
      permissions: [
        readPermission('product'),
        writePermission('product'),
        readPermission('permission'),
      ],
    });
  }

  getData(): { message: string } {
    return { message: 'Welcome to api-inventory!' };
  }
}
