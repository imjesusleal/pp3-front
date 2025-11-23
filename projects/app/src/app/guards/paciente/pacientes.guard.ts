import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AppLoginService } from '../../../../../app-login/src/public-api';
import { UserRoles } from '../../../../../app-login/src/lib/models/user_roles.enum';

export const pacientesGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AppLoginService);

  let user = authService.getUser();
  return user.user_rol == UserRoles.Pacientes;
};
