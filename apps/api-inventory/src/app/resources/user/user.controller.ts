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
  User,
  UpdateValidationPipe,
} from '@projects/models';

import { UserService } from './user.service';

const SINGULAR = 'user';
const PLURAL = 'users';

@Secure()
@ApiTags(UserController.name)
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  get(@Query() options: FindManyOptions) {
    return this.userService.find(options);
  }

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: User) {
    return this.userService.save(body);
  }

  @WritePermission(SINGULAR)
  @Patch(SINGULAR + '/:id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateValidationPipe) updated: User
  ) {
    return this.userService.update(id, updated);
  }

  @WritePermission(SINGULAR)
  @Delete(SINGULAR + '/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
