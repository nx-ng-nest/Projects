import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PubliconeController } from './publicone.controller';
import { Publicone } from './publicone.entity';
import { PubliconeService } from './publicone.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publicone])],
  controllers: [PubliconeController],
  providers: [PubliconeService],
})
export class PubliconeModule {}
