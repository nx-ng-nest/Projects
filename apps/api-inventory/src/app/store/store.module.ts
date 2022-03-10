import {
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { storeList } from './store-list';
import { StoreController } from './store.controller';
import { Store } from './store.entity';
import { StoreService } from './store.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule implements OnModuleInit {
  constructor(private storeService: StoreService) {}
  async onModuleInit() {
    for (const name of storeList()) {
      await this.storeService.createOne({ name });
    }
  }
}
