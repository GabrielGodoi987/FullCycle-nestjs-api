import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest();

    // o reflector está buscando do decorator roles
    const requiredRoles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(), // método do controller
      context.getClass(), // classe do controller,
    ]);

    if (!requiredRoles) {
      return true;
    }
    // includes -> verifica, se há naquela string ou array um dado especificado
    return requiredRoles.some((role) => user.role === role);
  }
}
