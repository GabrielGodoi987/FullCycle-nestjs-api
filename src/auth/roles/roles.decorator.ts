import { SetMetadata } from '@nestjs/common';
import { UserRoles } from './roles';

// vamos especificar quais roles são permitidas

export const Roles = (...args: UserRoles[]) => SetMetadata('roles', args);
