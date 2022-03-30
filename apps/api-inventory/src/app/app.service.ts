import { Injectable } from '@nestjs/common';
import { ProductService } from './resources';

import { commerce } from 'faker';
import { v4 } from 'uuid';
import { IID, IProduct } from '@projects/interface';

function randomItem(items: any[]): any {
  return items[Math.floor(Math.random() * items.length - 1)];
}

function fakeProduct(category?: IID): IProduct {
  return {
    uuid: v4(),
    name: commerce.productName() + Math.floor(Math.random() * 2000),
    description: commerce.productDescription(),
    features: {
      [commerce.productAdjective()]: commerce.productDescription(),
    },
    categories: [category],
  };
}

@Injectable()
export class AppService {
  constructor(
    // private readonly storeService: StoreService,
    // private readonly userService: UserService,
    protected readonly productService: ProductService // protected readonly categoryService: CategoryService, // protected readonly productDetailService: ProductDetailService
  ) {}

  async initStore() {
    // create stores

    // const store1 = await this.storeService.save({ name: 'Houston 1' });
    // const store2 = await this.storeService.save({ name: 'Victoria 2' });
    // const store3 = await this.storeService.save({ name: 'Baumant 3' });
    // const store4 = await this.storeService.save({ name: 'Lake Jackson 4' });
    // const store5 = await this.storeService.save({ name: 'Killen 1' });
    // const store6 = await this.storeService.save({ name: 'Killen 2' });

    // const cat1 = await this.categoryService.save({ name: 'Technology' });
    // const cat2 = await this.categoryService.save({ name: 'Plush' });
    // const cat3 = await this.categoryService.save({ name: 'Console' });
    // const cat4 = await this.categoryService.save({ name: 'Accessories' });
    // const cat5 = await this.categoryService.save({ name: 'Drones' });

    // function randCategory() {
    //   return randomItem([cat1, cat2, cat3, cat4, cat5]);
    // }

    for (let i = 0; i < 200; i++) {
      // const cat = randCategory();
      const product = fakeProduct();
      await this.productService.save(product);
    }

    // const user = await this.userService.save({
    //   username: 'nxng.dev@gmail.com',
    //   password: 'password',
    //   permissions: [readPermission('product'), writePermission('product')],
    // });
  }

  getData(): { message: string } {
    return { message: 'Welcome to api-inventory!' };
  }
}
