import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, switchMap } from 'rxjs';
import { AppLoginService } from '../app-login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private authService: AppLoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req;

    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      authReq = this.addToken(req, accessToken);
    }

    return next.handle(authReq).pipe(
      switchMap((event) => {
        return [event]; 
      }),
      (source$) =>
        source$.pipe(
          (error: any) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              return this.handle401(req, next);
            }
            return throwError(() => error);
          }
        )
    );
  }

  private handle401(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.authService.reAuthenticate().pipe(
        switchMap((res: any) => {
          this.isRefreshing = false;
          this.authService.setUser(res);
          return next.handle(this.addToken(req, res.access_token));
        })
      );
    }

    return throwError(() => new Error('Refresh in progress'));
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}