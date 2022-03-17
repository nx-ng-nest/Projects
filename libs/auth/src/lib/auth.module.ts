import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@projects/models';

import { JwtOptions } from './auth-jwt.options';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  JwtStrategy,
  LocalStrategy,
} from './strategies';

export type AuthModuleOptions = {
  isActive: boolean;
};

@Module({
  imports: [
    JwtModule.register(JwtOptions),
    TypeOrmModule.forFeature([User]),
    EventEmitterModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
