import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SampleController } from './sample.controller';
import { Sample } from './sample.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  controllers: [SampleController],
})
export class SampleModule {}
