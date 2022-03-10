import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuantityController } from './quantity.controller';
import { Quantity } from './quantity.entity';
import { QuantityService } from './quantity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quantity])],
  controllers: [QuantityController],
  providers: [QuantityService],
})
export class QuantityModule {}
