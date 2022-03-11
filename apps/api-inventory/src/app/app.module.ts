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
      name: 'product name 1',
      description: 'product description 1',
      barcode: 'product barcode 1',
    });
    const product2 = await this.ProductRepo.save({
      name: 'product name 2',
      description: 'product description 2',
      barcode: 'product barcode 2',
    });
    const product3 = await this.ProductRepo.save({
      name: 'product name 3',
      description: 'product description 3',
      barcode: 'product barcode 3',
    });

    const productDetail1 = await this.ProductdRepo.save({
      price: 100,
      quantity: 11,
      product: 1,
      store: 1,
    });
    const productDetail2 = await this.ProductdRepo.save({
      price: 200,
      quantity: 12,
      product: 1,
      store: 2,
    });
    const productDetail3 = await this.ProductdRepo.save({
      price: 300,
      quantity: 13,
      product: 1,
      store: 3,
    });

    const productDetail4 = await this.ProductdRepo.save({
      price: 200,
      quantity: 30,
      product: 2,
      store: 1,
    });
    const productDetail5 = await this.ProductdRepo.save({
      price: 202,
      quantity: 12,
      product: 2,
      store: 2,
    });
    const productDetail6 = await this.ProductdRepo.save({
      price: 209,
      quantity: 63,
      product: 2,
      store: 3,
    });

    const productDetail7 = await this.ProductdRepo.save({
      price: 523,
      quantity: 43,
      product: 3,
      store: 1,
    });
    const productDetail8 = await this.ProductdRepo.save({
      price: 55,
      quantity: 3,
      product: 3,
      store: 2,
    });
    const productDetail9 = await this.ProductdRepo.save({
      price: 6,
      quantity: 2,
      product: 3,
      store: 3,
    });

    // this.ProductRepo.query(
    //   `
    //  SELECT * FROM  (SELECT price, quantity, product."id", productd."storeId"
    //  FROM product LEFT JOIN  productd ON product."id" = productd."productId") as data WHERE data."storeId"=2;
    // `
    // ).then((data) => {
    //   console.log(data);
    // });

    // const result = await this.ProductRepo.createQueryBuilder('product')
    //   .leftJoinAndSelect('product.productds', 'productd')
    //   .where('productd.productId = product.id')
    //   .getMany();

    // .then(console.log);
  }
}
