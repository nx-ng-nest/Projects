import { ClassConstructor } from 'class-transformer';
import { CookieOptions } from 'express';

import {
  DynamicModule,
  Module,
} from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {
  JwtModule,
  JwtModuleOptions,
} from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IAuthUser } from './IAuthUser';
import { IsPublicImp } from './imps';
import { HasPermission } from './interfaces';
import {
  provideAuthCookieKey,
  provideAuthCookieOptions,
  provideAuthUserEntity,
  providehasPermission,
  provideIsPublicProvider,
  provideJwtModuleOptions,
} from './providers';
import {
  JwtStrategy,
  LocalStrategy,
} from './strategies';

export interface AuthModuleOptions<PermissionType> {
  jwtModuleOptions: JwtModuleOptions;
  authUserEntity: ClassConstructor<IAuthUser<PermissionType>>;
  authCookieKey: string;
  authCookieOptions: CookieOptions;
  hasPermission: ClassConstructor<HasPermission>;
}

@Module({})
export class AuthModule {
  static register<PermissionType = any>({
    authUserEntity,
    jwtModuleOptions,
    authCookieKey,
    authCookieOptions,
    hasPermission,
  }: AuthModuleOptions<PermissionType>): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        JwtModule.register(jwtModuleOptions),
        TypeOrmModule.forFeature([authUserEntity]),
        EventEmitterModule,
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,

        provideAuthUserEntity(authUserEntity),
        provideAuthCookieKey(authCookieKey),
        provideJwtModuleOptions(jwtModuleOptions),
        provideAuthCookieOptions(authCookieOptions),
        provideIsPublicProvider(IsPublicImp),
        providehasPermission(hasPermission),
      ],
      exports: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        provideAuthCookieKey(authCookieKey),
        provideJwtModuleOptions(jwtModuleOptions),
        provideAuthCookieOptions(authCookieOptions),
        provideIsPublicProvider(IsPublicImp),
        providehasPermission(hasPermission),
        provideAuthUserEntity(authUserEntity),
      ],
    };
  }
}
