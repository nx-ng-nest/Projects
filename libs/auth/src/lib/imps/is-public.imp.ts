import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { isPublicResource } from '../decorators';
import { IsPublic } from '../interfaces';

@Injectable()
export class IsPublicImp implements IsPublic {
  constructor(private readonly reflector: Reflector) {}
  isPublic(
    context: ExecutionContext,
    reflector: Reflector
  ): boolean | Promise<boolean> {
    return isPublicResource(context, this.reflector);
  }
}
