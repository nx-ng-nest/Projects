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
import { Permission } from '@projects/auth';
import { FindManyOptions } from '@projects/utils';
import {
  ValidateCreate,
  ValidateUpdate,
} from '@projects/validation';

import { PubliconeDTO } from './publicone.dto';
import { PubliconeService } from './publicone.service';

@ApiTags(PubliconeController.name)
@Controller()
export class PubliconeController {
  constructor(private readonly publiconeRepo: PubliconeService) {}

  @Get('publicones')
  @Permission({ method: 'GET', resource: 'publicone' })
  getAll(@Query() query: Record<string, any>) {
    return this.publiconeRepo.getAll(query);
  }

  @Post('publicones')
  @Permission({ method: 'GET', resource: 'publicone' })
  getAllWithQuery(@Body() query: FindManyOptions) {
    return this.publiconeRepo.getAllWithQuery(query);
  }

  @Get('publicone/:id')
  @Permission({ method: 'GET', resource: 'publicone' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.publiconeRepo.getById(id);
  }

  @Post('publicone')
  @Permission({ method: 'POST', resource: 'publicone' })
  createOne(@Body(ValidateCreate) body: PubliconeDTO) {
    return this.publiconeRepo.createOne(body);
  }

  @Patch('publicone/:id')
  @Permission({ method: 'PATCH', resource: 'publicone' })
  patchOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: PubliconeDTO
  ) {
    return this.publiconeRepo.patchOne(id, body);
  }

  @Delete('publicone/:id')
  @Permission({ method: 'DELETE', resource: 'publicone' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.publiconeRepo.deleteOne(id);
  }
}
