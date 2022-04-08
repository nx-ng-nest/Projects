import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@projects/models';

import {
  UserControllerRead,
  UserControllerWrite,
} from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserControllerRead, UserControllerWrite],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
