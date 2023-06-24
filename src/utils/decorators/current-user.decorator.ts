import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from 'src/domains/domain-auth/roles';

export interface ICurrentUser {
  id: number;
  role: Role;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
