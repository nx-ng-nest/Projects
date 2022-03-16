import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthJwtGuard,
  PublicResource,
  SetPermission,
} from '@projects/auth';

import { AppService } from './app.service';

@UseGuards(AuthJwtGuard)
@ApiTags(AppController.name)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SetPermission('GET:HELLO')
  @Get('hello')
  getData() {
    return this.appService.getData();
  }

  @PublicResource()
  @Get('public')
  public() {
    return 'Public resource!';
  }
}
