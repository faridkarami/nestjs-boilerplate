import { SetMetadata } from '@nestjs/common';

export const RoleType = (...roles: number[]) => SetMetadata('role', roles);
