import { Repository } from 'typeorm';

import {
  CacheModule,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import {
  InjectRepository,
  TypeOrmModule,
} from '@nestjs/typeorm';
import {
  AuthModule,
  User,
} from '@projects/auth';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Sample } from './sample/sample.entity';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/inventory.sqlite',
      entities: [Sample, User],
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([Sample, User]),
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 5,
    }),
    CacheModule.register({}),
    ScheduleModule.forRoot(),

    AuthModule,
    SampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  onModuleInit() {
    this.userRepo.save({
      username: 'aemrebasus@gmail.com',
      password: 'password',
      permissions: true,
    });
    this.userRepo.save({
      username: 'aecsteacher1@gmail.com',
      password: 'password',
      permissions: true,
    });
  }
}
