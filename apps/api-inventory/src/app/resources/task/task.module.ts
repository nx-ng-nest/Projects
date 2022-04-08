import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '@projects/models';

import {
  TaskControllerRead,
  TaskControllerWrite,
} from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskControllerRead, TaskControllerWrite],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
