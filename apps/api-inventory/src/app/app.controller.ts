import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags(AppController.name)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData() {
    return this.appService.getData();
  }
}
