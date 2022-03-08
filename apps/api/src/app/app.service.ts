import {
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  Cron,
  CronExpression,
} from '@nestjs/schedule';
import { Message } from '@projects/api-interfaces';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getData(): Message {
    return { message: 'Welcome to api!' };
  }

  @Cron(CronExpression.EVERY_HOUR)
  countBy3() {
    this.logger.debug(`CronExpression.EVERY_HOUR`);
  }
}
