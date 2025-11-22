import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AppLoginService } from '../../../../../app-login/src/public-api';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AppLoginService)
  return authService.isLogged();
};
