import { v4 } from 'uuid';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: process.env.API_SECRET || v4() }),
    UserModule,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
