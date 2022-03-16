import { Repository } from 'typeorm';

import {
  CacheModule,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import {
  InjectRepository,
  TypeOrmModule,
} from '@nestjs/typeorm';
import {
  AuthModule,
  readPermission,
  writePermission,
} from '@projects/auth';
import { User } from '@projects/models';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResourceModules } from './resources';
import { ResourceEntities } from './resources/resource.entities';

@Module({
  imports: [
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
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  onModuleInit() {
    this.userRepo.save({
      username: 'nxng.dev@gmail.com',
      password: 'password',
      permissions: [readPermission('product'), writePermission('product')],
    });
  }
}
