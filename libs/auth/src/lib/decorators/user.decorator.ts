import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { User } from '@projects/models';

/**
 * Get user object from the context
 * @param context
 * @returns
 */
export function getUserObject(context: ExecutionContext): User {
  return context.switchToHttp().getRequest().user;
}

/**
 * Get user data pram decorator.
 */
export const UserData = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getUserObject(context);
  }
);

/**
 * Get user id param decorator.
 */
export const UserID = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getUserObject(context).id;
  }
);
