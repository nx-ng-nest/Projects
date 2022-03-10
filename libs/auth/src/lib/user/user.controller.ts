import { Repository } from 'typeorm';

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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions } from '@projects/utils';
import {
  ValidateCreate,
  ValidateUpdate,
} from '@projects/validation';

import { Permission } from '../decorator';
import { AuthJwtGuard } from '../guards';
import { UserDTO } from './user.dto';
import { User } from './user.entity';

@ApiTags(UserController.name)
@UseGuards(AuthJwtGuard)
@Controller()
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly sampleRepo: Repository<User>
  ) {}

  @Get('users')
  @Permission({ method: 'GET', resource: 'user' })
  getAll(@Query() query: Record<string, any>) {
    return this.sampleRepo.find(query);
  }

  @Post('users')
  @Permission({ method: 'GET', resource: 'user' })
  getAllWithQuery(@Body() query: FindManyOptions) {
    return this.sampleRepo.find(query);
  }

  @Get('user/:id')
  @Permission({ method: 'GET', resource: 'user' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.sampleRepo.findOne(id);
  }

  @Post('user')
  @Permission({ method: 'POST', resource: 'user' })
  createOne(@Body(ValidateCreate) body: UserDTO) {
    return this.sampleRepo.save(body);
  }

  @Patch('user/:id')
  @Permission({ method: 'PATCH', resource: 'user' })
  patchOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: UserDTO
  ) {
    return this.sampleRepo.update(id, body);
  }

  @Delete('user/:id')
  @Permission({ method: 'DELETE', resource: 'user' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.sampleRepo.delete(id);
  }
}
