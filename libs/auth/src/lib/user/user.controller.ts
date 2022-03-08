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
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidateCreate,
  ValidateUpdate,
} from '@projects/validation';

import {
  DeletePermission,
  GetPermission,
  PatchPermission,
  PostPermission,
} from '../permission';
import { UserDTO } from './user.dto';
import { User } from './user.entity';

@ApiTags(UserController.name)
@Controller()
export class UserController {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  @GetPermission('user')
  @ApiOkResponse({ description: 'Entities found and returned.' })
  @ApiInternalServerErrorResponse({
    description: 'There is an internal error!',
  })
  @GetPermission('user')
  @Get('users')
  findAll() {
    return this.userRepo.find();
  }

  @GetPermission('user')
  @ApiOkResponse({ description: 'Entity is found and returned.' })
  @ApiNotFoundResponse({ description: 'Entity with the id is not found!' })
  @ApiInternalServerErrorResponse({
    description: 'There is an internal error!',
  })
  @Get('user/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.userRepo.findOne(id);
  }

  @PostPermission('user')
  @ApiCreatedResponse({ description: 'Entity is created.' })
  @ApiInternalServerErrorResponse({
    description: 'There is an internal error!',
  })
  @Post('user')
  save(@Body(ValidateCreate) body: UserDTO) {
    return this.userRepo.save(body);
  }

  @PatchPermission('user')
  @ApiOkResponse({ description: 'Entity with the id is updated.' })
  @ApiNotFoundResponse({ description: 'Entity with id is not found!' })
  @ApiInternalServerErrorResponse({
    description: 'There is an internal error!',
  })
  @Patch('user/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: UserDTO
  ) {
    return this.userRepo.update(id, body);
  }

  @DeletePermission('user')
  @ApiOkResponse({ description: 'Entity with id is deleted.' })
  @ApiNotFoundResponse({ description: 'Entity with id is not found!' })
  @ApiInternalServerErrorResponse({
    description: 'There is an internal error!',
  })
  @Delete('user/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userRepo.delete(id);
  }
}
