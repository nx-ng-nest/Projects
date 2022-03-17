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
  Task,
  UpdateValidationPipe,
} from '@projects/models';

import { TaskService } from './task.service';

const SINGULAR = 'task';
const PLURAL = 'tasks';

@Secure()
@ApiTags(TaskController.name)
@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  get(@Query() options: FindManyOptions) {
    return this.taskService.find(options);
  }

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: Task) {
    return this.taskService.save(body);
  }

  @WritePermission(SINGULAR)
  @Patch(SINGULAR + '/:id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateValidationPipe) updated: Task
  ) {
    return this.taskService.update(id, updated);
  }

  @WritePermission(SINGULAR)
  @Delete(SINGULAR + '/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.delete(id);
  }
}
