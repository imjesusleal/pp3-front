import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AppLoginService } from '../../../../../app-login/src/public-api';
import { map, catchError, of } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';
import { LoginResponseModel } from '../../../../../app-login/src/lib/models/login.model';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AppLoginService);
  const router = inject(NavigationService);

  const user = authService.getUser();

  if (user && user.access_token) {
    return true;
  }

  return authService.reAuthenticate().pipe(
    map(user => {
      authService.setUser(user);
      return true;
    }),
    catchError(() => {
      return of(false);
    })
  );
  
};
