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
  User,
  UpdateValidationPipe,
} from '@projects/models';

import { UserService } from './user.service';

const SINGULAR = 'user';
const BYID = 'user/:id';
const BYUUID = 'user/uuid/:uuid';
const PLURAL = 'users';
const STREAM = 'user-stream';
const COLUMNS = 'user-columns';

@Secure()
@ApiTags(UserControllerRead.name)
@UseInterceptors(CacheInterceptor)
@Controller()
export class UserControllerRead {
  constructor(private readonly userService: UserService) {}

  @ReadPermission(SINGULAR)
  @Get(STREAM)
  async stream(@Res() res: Response) {
    this.userService.stream(res);
  }

  @ReadPermission(SINGULAR)
  @Get(COLUMNS)
  async columns() {
    return this.userService.columns();
  }

  @ReadPermission(SINGULAR)
  @Get(BYID)
  getOneById(@Param('id') id: number) {
    return this.userService.findOne({ where: { id } });
  }

  @ReadPermission(SINGULAR)
  @Get(BYUUID)
  getOneByUUID(@Param('uuid') uuid: number) {
    return this.userService.findOne({ where: { uuid } });
  }

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  async get() {
    return this.userService.find();
  }
}

@Secure()
@ApiTags(UserControllerWrite.name)
@Controller()
export class UserControllerWrite {
  constructor(private readonly userService: UserService) {}

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: User) {
    const newUser = this.userService.save(body);
    return newUser;
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
