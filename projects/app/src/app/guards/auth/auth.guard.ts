import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AppLoginService } from '../../../../../app-login/src/public-api';
import { map, catchError, of, tap } from 'rxjs';
import { LoginResponseModel } from '../../../../../app-login/src/lib/models/login.model';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AppLoginService);

  if (authService.isLogged()) {
    return true;
  }

  return false;
};
