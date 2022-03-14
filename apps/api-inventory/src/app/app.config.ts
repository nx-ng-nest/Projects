import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  AuthUser,
  Category,
  Product,
  ProductDetail,
  Store,
  UserDetail,
} from '@projects/models';

export const AppConfig = {
  DATABASE_CONFIG: {
    type: 'postgres',
    username: 'postgres',
    password: 'password',
    database: 'api-inventory',
    entities: [AuthUser, UserDetail, Product, Store, ProductDetail, Category],
    synchronize: true,
    dropSchema: true,
  } as TypeOrmModuleOptions,
};
