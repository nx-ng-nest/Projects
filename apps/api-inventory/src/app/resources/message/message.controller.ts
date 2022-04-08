import { Response } from 'express';

import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseInterceptors,
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
const BYID = 'message/:id';
const BYUUID = 'message/uuid/:uuid';
const PLURAL = 'messages';
const STREAM = 'message-stream';
const COLUMNS = 'message-columns';

@Secure()
@ApiTags(MessageControllerRead.name)
@UseInterceptors(CacheInterceptor)
@Controller()
export class MessageControllerRead {
  constructor(private readonly messageService: MessageService) {}

  @ReadPermission(SINGULAR)
  @Get(STREAM)
  async stream(@Res() res: Response) {
    this.messageService.stream(res);
  }

  @ReadPermission(SINGULAR)
  @Get(COLUMNS)
  async columns() {
    return this.messageService.columns();
  }

  @ReadPermission(SINGULAR)
  @Get(BYID)
  getOneById(@Param('id') id: number) {
    return this.messageService.findOne({ where: { id } });
  }

  @ReadPermission(SINGULAR)
  @Get(BYUUID)
  getOneByUUID(@Param('uuid') uuid: number) {
    return this.messageService.findOne({ where: { uuid } });
  }

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  async get() {
    return this.messageService.find();
  }
}

@Secure()
@ApiTags(MessageControllerWrite.name)
@Controller()
export class MessageControllerWrite {
  constructor(private readonly messageService: MessageService) {}

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: Message) {
    const newMessage = this.messageService.save(body);
    return newMessage;
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
