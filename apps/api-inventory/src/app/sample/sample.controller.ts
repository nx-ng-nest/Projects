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
  ValidateCreate,
  ValidateUpdate,
} from '@projects/validation';

import { SampleDTO } from './sample.dto';
import { SampleService } from './sample.service';

@ApiTags(SampleController.name)
@Controller()
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get('samples')
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('query') query: string
  ) {
    return this.sampleService.findAll(page, query);
  }

  @Get('sample:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.sampleService.findById(id);
  }

  @Post('sample')
  createOne(@Body(ValidateCreate) body: SampleDTO) {
    return this.sampleService.createOne(body);
  }

  @Patch('sample/:id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: SampleDTO
  ) {
    return this.sampleService.updateOne(id, body);
  }

  @Delete('sample/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.sampleService.deleteOne(id);
  }
}
