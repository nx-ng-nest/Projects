import { FindManyOptions } from 'typeorm';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ReadPermission,
  Secure,
  WritePermission,
} from '@projects/auth';
import {
  CreateValidationPipe,
  Message,
  UpdateValidationPipe,
} from '@projects/models';

import { MessageService } from './message.service';

const SINGULAR = 'message';
const PLURAL = 'messages';

@Secure()
@ApiTags(MessageController.name)
@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  get(@Query() options: FindManyOptions) {
    return this.messageService.find(options);
  }

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: Message) {
    return this.messageService.save(body);
  }

  @WritePermission(SINGULAR)
  @Patch(SINGULAR + '/:id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateValidationPipe) updated: Message
  ) {
    return this.messageService.update(id, updated);
  }

  @WritePermission(SINGULAR)
  @Delete(SINGULAR + '/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.delete(id);
  }
}
