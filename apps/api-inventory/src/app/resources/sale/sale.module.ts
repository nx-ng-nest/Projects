import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from '@projects/models';

import {
  SaleControllerRead,
  SaleControllerWrite,
} from './sale.controller';
import { SaleService } from './sale.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sale])],
  controllers: [SaleControllerRead, SaleControllerWrite],
  providers: [SaleService],
  exports: [SaleService],
})
export class SaleModule {}
