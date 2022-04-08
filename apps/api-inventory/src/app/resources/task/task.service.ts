import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BaseDataService,
  Task,
} from '@projects/models';

@Injectable()
export class TaskService extends BaseDataService<Task> {
  constructor(@InjectRepository(Task) taskRepo: Repository<Task>) {
    super(taskRepo);
  }
}
