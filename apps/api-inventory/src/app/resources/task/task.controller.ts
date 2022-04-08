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
  Task,
  UpdateValidationPipe,
} from '@projects/models';

import { TaskService } from './task.service';

const SINGULAR = 'task';
const BYID = 'task/:id';
const BYUUID = 'task/uuid/:uuid';
const PLURAL = 'tasks';
const STREAM = 'task-stream';
const COLUMNS = 'task-columns';

@Secure()
@ApiTags(TaskControllerRead.name)
@UseInterceptors(CacheInterceptor)
@Controller()
export class TaskControllerRead {
  constructor(private readonly taskService: TaskService) {}

  @ReadPermission(SINGULAR)
  @Get(STREAM)
  async stream(@Res() res: Response) {
    this.taskService.stream(res);
  }

  @ReadPermission(SINGULAR)
  @Get(COLUMNS)
  async columns() {
    return this.taskService.columns();
  }

  @ReadPermission(SINGULAR)
  @Get(BYID)
  getOneById(@Param('id') id: number) {
    return this.taskService.findOne({ where: { id } });
  }

  @ReadPermission(SINGULAR)
  @Get(BYUUID)
  getOneByUUID(@Param('uuid') uuid: number) {
    return this.taskService.findOne({ where: { uuid } });
  }

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  async get() {
    return this.taskService.find();
  }
}

@Secure()
@ApiTags(TaskControllerWrite.name)
@Controller()
export class TaskControllerWrite {
  constructor(private readonly taskService: TaskService) {}

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: Task) {
    const newTask = this.taskService.save(body);
    return newTask;
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
