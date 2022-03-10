import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SampleController } from './sample.controller';
import { Sample } from './sample.entity';
import { SampleService } from './sample.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  controllers: [SampleController],
  providers: [SampleService],
})
export class SampleModule {}
