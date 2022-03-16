import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from '@projects/auth';

import { AppService } from './app.service';

@ApiTags(AppController.name)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthJwtGuard)
  @Get('hello')
  getData() {
    return this.appService.getData();
  }

  @Get('public')
  public() {
    return 'Public resource!';
  }
}
