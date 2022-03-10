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
  AuthModule,
  User,
} from '@projects/auth';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  Category,
  CategoryModule,
} from './category';
import {
  Price,
  PriceModule,
} from './price';
import {
  Product,
  ProductModule,
} from './product';
import {
  Publicone,
  PubliconeModule,
} from './publicone';
import {
  Quantity,
  QuantityModule,
} from './quantity';
import {
  Sample,
  SampleModule,
} from './sample';
import {
  Store,
  StoreModule,
} from './store';

const entities = [
  Publicone,
  Sample,
  User,
  Product,
  Price,
  Quantity,
  Store,
  Category,
];
const dataModules = [
  PubliconeModule,
  SampleModule,
  ProductModule,
  PriceModule,
  QuantityModule,
  StoreModule,
  CategoryModule,
];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/inventory.sqlite',
      entities: entities,
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature(entities),
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 5,
    }),
    CacheModule.register({}),
    ScheduleModule.forRoot(),

    AuthModule,

    ...dataModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  onModuleInit() {
    this.userRepo.save({
      username: 'nxng.dev@gmail.com',
      password: 'password',
      permissions: {
        user: { GET: true, POST: true, PATCH: true, DELETE: true },
        product: { GET: true, POST: true, PATCH: true, DELETE: true },
        category: { GET: true, POST: true, PATCH: true, DELETE: true },
        price: { GET: true, POST: true, PATCH: true, DELETE: true },
        quantity: { GET: true, POST: true, PATCH: true, DELETE: true },
        store: { GET: true, POST: true, PATCH: true, DELETE: true },
        sale: { GET: true, POST: true, PATCH: true, DELETE: true },
        sample: { GET: true, POST: true, PATCH: true, DELETE: true },
        publicone: { GET: true, POST: true, PATCH: true, DELETE: true },
      },
    });
    this.userRepo.save({
      username: 'aemrebas.dev@gmail.com',
      password: 'password',
      permissions: {
        product: {
          GET: true,
        },
      },
    });
  }
}
