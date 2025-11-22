import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { UserRoles } from '../../../../../app-login/src/lib/models/user_roles.enum';
import { AppLoginService } from '../../../../../app-login/src/public-api';

export const medicosGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AppLoginService)

  if (!authService.hasProfile) {
    return false;
  }

  const user = authService.getUser();
  return user.user_rol == UserRoles.Medicos;
};
