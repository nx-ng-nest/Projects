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
  DeletePermission,
  GetPermission,
  PatchPermission,
  PostPermission,
} from '@projects/auth';
import {
  ValidateCreate,
  ValidateUpdate,
} from '@projects/validation';

import { SampleDTO } from './sample.dto';
import { Sample } from './sample.entity';

@ApiTags(SampleController.name)
@Controller()
export class SampleController {
  constructor(
    @InjectRepository(Sample) private sampleRepo: Repository<Sample>
  ) {}

  @ApiOkResponse({ description: 'Entities found and returned.' })
  @ApiInternalServerErrorResponse({
    description: 'There is an internal error!',
  })
  @GetPermission('sample')
  @Get('samples')
  findAll() {
    return this.sampleRepo.find();
  }

  @GetPermission('sample')
  @ApiOkResponse({ description: 'Entity is found and returned.' })
  @ApiNotFoundResponse({ description: 'Entity with the id is not found!' })
  @ApiInternalServerErrorResponse({
    description: 'There is an internal error!',
  })
  @Get('sample/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.sampleRepo.findOne(id);
  }

  @PostPermission('sample')
  @ApiCreatedResponse({ description: 'Entity is created.' })
  @ApiInternalServerErrorResponse({
    description: 'There is an internal error!',
  })
  @Post('sample')
  save(@Body(ValidateCreate) body: SampleDTO) {
    return this.sampleRepo.save(body);
  }

  @PatchPermission('sample')
  @ApiOkResponse({ description: 'Entity with the id is updated.' })
  @ApiNotFoundResponse({ description: 'Entity with id is not found!' })
  @ApiInternalServerErrorResponse({
    description: 'There is an internal error!',
  })
  @Patch('sample/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: SampleDTO
  ) {
    return this.sampleRepo.update(id, body);
  }

  @DeletePermission('sample')
  @ApiOkResponse({ description: 'Entity with id is deleted.' })
  @ApiNotFoundResponse({ description: 'Entity with id is not found!' })
  @ApiInternalServerErrorResponse({
    description: 'There is an internal error!',
  })
  @Delete('sample/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.sampleRepo.delete(id);
  }
}
