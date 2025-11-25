import { inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AppLoginService } from '../app-login.service';


let isRefreshing = false;

export function authInterceptorFn(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {

  const authService = inject(AppLoginService);
  let authReq = req;

  const accessToken = authService.getAccessToken();
  if (accessToken) {
    authReq = addToken(req, accessToken);
  }

  return next(authReq).pipe(
    catchError((error) => {
      // Si NO es 401: devolvelo como error
      if (!(error instanceof HttpErrorResponse) || error.status !== 401) {
        return throwError(() => error);
      }

      // Es 401 → refrescar
      return handle401(req, next, authService);
    })
  );
}

function handle401(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AppLoginService
) {
  if (!isRefreshing) {
    isRefreshing = true;

    return authService.reAuthenticate().pipe(
      switchMap((res: any) => {
        isRefreshing = false;
        authService.setUser(res);
        return next(addToken(req, res.access_token));
      })
    );
  }

  return throwError(() => new Error('Refresh in progress'));
}

function addToken(req: HttpRequest<any>, token: string) {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
