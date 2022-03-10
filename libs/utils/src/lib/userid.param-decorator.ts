import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export function getUserObject(context: ExecutionContext) {
  return context.switchToHttp().getRequest().user;
}

export const UserData = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getUserObject(context);
  }
);

export const UserID = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getUserObject(context).id;
  }
);
