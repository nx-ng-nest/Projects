import { ClassConstructor } from 'class-transformer';

import {
  Inject,
  Provider,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

const AUTH_USER_REPO_TOKEN = `AUTH_USER_REPO_TOKEN_$v4()}`;
const AUTH_USER_ENTITY = `AUTH_USER_ENTITY_$v4()}`;

export function provideAuthUserRepoInjector<T = any>(
  entity: ClassConstructor<T>
): Provider {
  return {
    provide: AUTH_USER_REPO_TOKEN,
    useValue: () => InjectRepository(entity),
  };
}

export function provideAuthUserEntity(entity: ClassConstructor<any>) {
  return {
    provide: AUTH_USER_ENTITY,
    useValue: entity,
  };
}

export function InjectAuthUserRepo() {
  return Inject(AUTH_USER_REPO_TOKEN);
}

export function InjectAuthUserEntity() {
  return Inject(AUTH_USER_ENTITY);
}
