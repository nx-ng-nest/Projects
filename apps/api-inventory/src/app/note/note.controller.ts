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
import {
  AuthJwtGuard,
  Permission,
} from '@projects/auth';
import { FindManyOptions } from '@projects/utils';
import {
  ValidateCreate,
  ValidateUpdate,
} from '@projects/validation';

import { NoteDTO } from './note.dto';
import { NoteService } from './note.service';

@ApiTags(NoteController.name)
@UseGuards(AuthJwtGuard)
@Controller()
export class NoteController {
  constructor(private readonly noteRepo: NoteService) {}

  @Get('notes')
  @Permission({ method: 'GET', resource: 'note' })
  getAll(@Query() query: Record<string, any>) {
    return this.noteRepo.getAll(query);
  }

  @Post('notes')
  @Permission({ method: 'GET', resource: 'note' })
  getAllWithQuery(@Body() query: FindManyOptions) {
    return this.noteRepo.getAllWithQuery(query);
  }

  @Get('note/:id')
  @Permission({ method: 'GET', resource: 'note' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.noteRepo.getById(id);
  }

  @Post('note')
  @Permission({ method: 'POST', resource: 'note' })
  createOne(@Body(ValidateCreate) body: NoteDTO) {
    return this.noteRepo.createOne(body);
  }

  @Patch('note/:id')
  @Permission({ method: 'PATCH', resource: 'note' })
  patchOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: NoteDTO
  ) {
    return this.noteRepo.patchOne(id, body);
  }

  @Delete('note/:id')
  @Permission({ method: 'DELETE', resource: 'note' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.noteRepo.deleteOne(id);
  }
}
