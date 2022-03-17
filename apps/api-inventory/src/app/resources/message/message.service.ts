import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BaseDataService,
  Message,
} from '@projects/models';

@Injectable()
export class MessageService extends BaseDataService<Message> {
  constructor(@InjectRepository(Message) messageRepo: Repository<Message>) {
    super(messageRepo);
  }
}
