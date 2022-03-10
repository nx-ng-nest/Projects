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

import { SampleDTO } from './sample.dto';
import { SampleService } from './sample.service';

@ApiTags(SampleController.name)
@UseGuards(AuthJwtGuard)
@Controller()
export class SampleController {
  constructor(private readonly sampleRepo: SampleService) {}

  @Get('samples')
  @Permission({ method: 'GET', resource: 'sample' })
  getAll(@Query() query: Record<string, any>) {
    return this.sampleRepo.getAll(query);
  }

  @Post('samples')
  @Permission({ method: 'GET', resource: 'sample' })
  getAllWithQuery(@Body() query: FindManyOptions) {
    return this.sampleRepo.getAllWithQuery(query);
  }

  @Get('sample/:id')
  @Permission({ method: 'GET', resource: 'sample' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.sampleRepo.getById(id);
  }

  @Post('sample')
  @Permission({ method: 'POST', resource: 'sample' })
  createOne(@Body(ValidateCreate) body: SampleDTO) {
    return this.sampleRepo.createOne(body);
  }

  @Patch('sample/:id')
  @Permission({ method: 'PATCH', resource: 'sample' })
  patchOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: SampleDTO
  ) {
    return this.sampleRepo.patchOne(id, body);
  }

  @Delete('sample/:id')
  @Permission({ method: 'DELETE', resource: 'sample' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.sampleRepo.deleteOne(id);
  }
}
