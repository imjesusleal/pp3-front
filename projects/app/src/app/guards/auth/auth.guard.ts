import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AppLoginService } from '../../../../../app-login/src/public-api';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AppLoginService)
  const user = authService.getUser();

  if (!user) return false;

  if (!user.access_token) return false;

  return true;
};
