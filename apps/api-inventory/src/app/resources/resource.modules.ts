import { CategoryModule } from './category';
import { MessageModule } from './message';
import { ProductModule } from './product';
import { ProductDetailModule } from './product-detail';
import { SaleModule } from './sale';
import { StoreModule } from './store';
import { TaskModule } from './task';
import { UserModule } from './user';

export const ResourceModules = [
  ProductModule,
  ProductDetailModule,
  UserModule,
  StoreModule,
  SaleModule,
  CategoryModule,
  MessageModule,
  TaskModule,
];
