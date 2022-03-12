import { Repository } from 'typeorm';

import {
  CacheModule,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import {
  InjectRepository,
  TypeOrmModule,
} from '@nestjs/typeorm';
import {
  Category,
  Product,
  Productd,
  Store,
  User,
} from '@projects/models';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'password',
      database: 'api-inventory',
      entities: [User, Product, Store, Productd, Category],
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([User, Product, Store, Productd, Category]),

    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 5,
    }),
    CacheModule.register({}),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectRepository(User) private UserRepo: Repository<User>,
    @InjectRepository(Product) private ProductRepo: Repository<Product>,
    @InjectRepository(Productd) private ProductdRepo: Repository<Productd>,
    @InjectRepository(Category) private CategoryRepo: Repository<Category>,
    @InjectRepository(Store) private StoreRepo: Repository<Store>
  ) {
    // constuct
  }
  async onModuleInit() {
    const store1 = await this.StoreRepo.save({ name: 'store 1' });
    const store2 = await this.StoreRepo.save({ name: 'store 2' });
    const store3 = await this.StoreRepo.save({ name: 'store 3' });

    // Product
    const product1 = await this.ProductRepo.save({
      name: 'pn 1',
      description: 'pd 1',
      barcode: 'pb 1',
    });
    const product2 = await this.ProductRepo.save({
      name: 'pn 2',
      description: 'pd 2',
      barcode: 'pb 2',
    });
    const product3 = await this.ProductRepo.save({
      name: 'pn 3',
      description: 'pd 3',
      barcode: 'pb 3',
    });

    const productDetail1 = await this.ProductdRepo.save({
      price: 11,
      quantity: 11,
      product: 1,
      store: 1,
    });
    const productDetail2 = await this.ProductdRepo.save({
      price: 12,
      quantity: 12,
      product: 1,
      store: 2,
    });
    const productDetail3 = await this.ProductdRepo.save({
      price: 13,
      quantity: 13,
      product: 1,
      store: 3,
    });

    const productDetail4 = await this.ProductdRepo.save({
      price: 21,
      quantity: 21,
      product: 2,
      store: 1,
    });
    const productDetail5 = await this.ProductdRepo.save({
      price: 22,
      quantity: 22,
      product: 2,
      store: 2,
    });
    const productDetail6 = await this.ProductdRepo.save({
      price: 23,
      quantity: 23,
      product: 2,
      store: 3,
    });

    const productDetail7 = await this.ProductdRepo.save({
      price: 31,
      quantity: 31,
      product: 3,
      store: 1,
    });
    const productDetail8 = await this.ProductdRepo.save({
      price: 32,
      quantity: 32,
      product: 3,
      store: 2,
    });
    const productDetail9 = await this.ProductdRepo.save({
      price: 33,
      quantity: 33,
      product: 3,
      store: 3,
    });

    this.ProductdRepo.createQueryBuilder('productd')
      .leftJoinAndSelect(
        'productd.product',
        'product',
        'product.id = productd.productId'
      )
      .select(
        'product.id as pid, productd.store as store,  product.name,  productd.price, productd.quantity'
      )
      .andWhere('productd.store IN(:...ids)', { ids: [1, 3] })
      .orderBy('store')
      .execute()
      .then(console.log);
  }
}
