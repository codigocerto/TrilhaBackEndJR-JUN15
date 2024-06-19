import { ExecutionContext, createParamDecorator } from '@nestjs/common';
export const getUserByContext = (context: ExecutionContext) => {
  if (context.getType() == 'http') {
    return context.switchToHttp().getRequest().user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getUserByContext(context),
);
