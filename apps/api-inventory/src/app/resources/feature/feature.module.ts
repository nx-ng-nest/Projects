import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from '@projects/models';

import {
  FeatureControllerRead,
  FeatureControllerWrite,
} from './feature.controller';
import { FeatureService } from './feature.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feature])],
  controllers: [FeatureControllerRead, FeatureControllerWrite],
  providers: [FeatureService],
  exports: [FeatureService],
})
export class FeatureModule {}
