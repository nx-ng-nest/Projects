import {
  DynamicModule,
  Module,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '@projects/email';
import { AuthUser } from '@projects/models';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { PermissionService } from './permission.service';
import {
  JwtStrategy,
  LocalStrategy,
} from './strategies';

export interface AuthModuleOptions {
  secured: {
    [scope: string]: {
      [resourceName: string]:
        | {
            [method: string]: boolean;
          }
        | boolean;
    };
  };
}

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '3h',
      },
    }),
    TypeOrmModule.forFeature([AuthUser]),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, PermissionService],
})
export class AuthModule {
  static register(): DynamicModule {
    return {
      module: AuthModule,
    };
  }
}
