import {
  DynamicModule,
  Module,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '@projects/email';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { PermissionService } from './permission.service';
import {
  JwtStrategy,
  LocalStrategy,
} from './strategies';
import {
  User,
  UserModule,
} from './user';

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
    TypeOrmModule.forFeature([User]),
    UserModule,
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
