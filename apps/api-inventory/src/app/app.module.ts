import {
  CacheModule,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import {
  ThrottlerGuard,
  ThrottlerModule,
} from '@nestjs/throttler';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { AuthModule } from '@projects/auth';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './common';
import { ResourceModules } from './resources';
import { ResourceEntities } from './resources/resource.entities';
import { UserService } from './resources/user';

const dbConfig: { [key: string]: TypeOrmModuleOptions } = {
  sqlite: {
    type: 'sqlite',
    database: 'database/inventory.sqlite',
  },
  postgres: {
    type: 'postgres',
    username: 'postgres',
    password: 'password',
    database: 'api-inventory',
  },
};
@Module({
  imports: [
    GlobalModule,
    TypeOrmModule.forRoot({
      ...dbConfig.sqlite,
      entities: ResourceEntities,
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature(ResourceEntities),
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 3,
      limit: 1,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 5,
      max: 20,
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ...ResourceModules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,

    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly appService: AppService) {}
  async onModuleInit() {
    await this.appService.initStore();
  }
}
