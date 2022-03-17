import {
  CacheModule,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@projects/auth';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './common';
import { ResourceModules } from './resources';
import { ResourceEntities } from './resources/resource.entities';

@Module({
  imports: [
    GlobalModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'password',
      database: 'api-inventory',
      entities: ResourceEntities,
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature(ResourceEntities),
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 5,
    }),
    CacheModule.register({}),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ...ResourceModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly appService: AppService) {}
  onModuleInit() {
    this.appService.initStore();
  }
}
