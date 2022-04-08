import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '@projects/models';

import {
  StoreControllerRead,
  StoreControllerWrite,
} from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  controllers: [StoreControllerRead, StoreControllerWrite],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
