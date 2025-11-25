import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RegisterModel, RegisterResponse } from './models/register.interface';
import { enviroment } from '../../../app/src/enviroments/enviroment';
import { LoginModel, LoginResponseModel } from './models/login.model';
import { ReAuthenticateModel } from './models/retauthenticate.interface';
import { HttpCoreService } from '../../../app-core/src/lib/services/http-core/http-core.service';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {

  private url = enviroment.urlLogin;

  hasProfile: boolean = false;

  private userBs$: BehaviorSubject<LoginResponseModel> = new BehaviorSubject<LoginResponseModel>(LoginResponseModel.Create());
  userObs$ = this.userBs$.asObservable();

  constructor(private http: HttpCoreService) { }

  register(registerModel: RegisterModel): Observable<RegisterResponse> {
    const fullUrl = this.url + 'register';
    return this.http.post$<RegisterResponse>(fullUrl, registerModel);
  }

  login(loginModel: LoginModel): Observable<LoginResponseModel> {
    const fullUrl = this.url + 'login';
    return this.http.post$<LoginResponseModel>(fullUrl, loginModel, "", true).pipe(
      tap((res) => {
        this.userBs$.next(res);
      })
    );
  }

  reAuthenticate(): Observable<LoginResponseModel> {
    const fullUrl = this.url + 'reauthenticate';
    return this.http.rawPost$<LoginResponseModel>(fullUrl, null, "", true);
  }

  logout() {
    this.userBs$.next(LoginResponseModel.Create());
    this.cleanLocalStorage();
  }

  isLogged(): boolean {
    const user = this.userBs$.value;
    return user.access_token !== undefined;
  }

  setUser(user: LoginResponseModel) {
    this.userBs$.next(user);
  }

  getUser(): LoginResponseModel {
    const user = this.userBs$.value;
    return user;
  }

  getAccessToken(): string | undefined {
    return this.userBs$.value.access_token;
  }

  getRefreshToken(): string | undefined {
    return this.userBs$.value.refresh_token;
  }

  getUserId(): number | undefined {
    return this.userBs$.value.id_user;
  }

  cleanLocalStorage() {
    localStorage.clear();
  }
}
