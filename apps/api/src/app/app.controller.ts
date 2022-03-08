import {
  CacheInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Message } from '@projects/api-interfaces';

import { AppService } from './app.service';

@ApiTags(AppController.name)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('bye')
  @UseInterceptors(CacheInterceptor)
  bye() {
    console.log('New bye request!');
    return { message: 'bye' };
  }

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }
}
