import { Repository } from 'typeorm';
import { v4 } from 'uuid';

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
import { AuthModule } from '@projects/auth';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthUser,
  HasPermissionImp,
} from './auth';

const ENTITIES = [AuthUser];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'password',
      database: 'api-inventory',
      entities: [AuthUser],
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([AuthUser]),

    AuthModule.register({
      authCookieKey: 'auth-token',
      authCookieOptions: {
        secure: true,
        sameSite: true,
        expires: new Date(),
        httpOnly: true,
      },
      authUserEntity: AuthUser,
      hasPermission: HasPermissionImp,

      jwtModuleOptions: {
        secret: v4(),
      },
    }),

    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 5,
    }),
    CacheModule.register({}),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectRepository(AuthUser) private userRepo: Repository<AuthUser>
  ) {}
  onModuleInit() {
    this.userRepo.save({
      username: 'nxng.dev@gmail.com',
      password: 'password',
      permissions: [],
    });
  }
}
