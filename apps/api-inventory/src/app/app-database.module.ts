import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthUser,
  Category,
  Product,
  ProductDetail,
  Store,
  UserDetail,
} from '@projects/models';

const ENTITIES = [
  AuthUser,
  UserDetail,
  Product,
  Store,
  ProductDetail,
  Category,
];
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'password',
      database: 'api-inventory',
      entities: ENTITIES,
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature(ENTITIES),
  ],
  exports: [TypeOrmModule],
})
export class AppDatabaseModule {}
