import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '@projects/models';

import {
  MessageControllerRead,
  MessageControllerWrite,
} from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessageControllerRead, MessageControllerWrite],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
