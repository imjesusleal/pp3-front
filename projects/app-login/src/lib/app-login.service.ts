import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RegisterModel, RegisterResponse } from './models/register.interface';
import { enviroment } from '../../../app/src/enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { LoginModel, LoginResponseModel } from './models/login.model';
import { ReAuthenticateModel } from './models/retauthenticate.interface';
import { AlertService } from '../../../app-core/src/lib/services/alert/alert.service';
import { HttpCoreService } from '../../../app-core/src/lib/services/http-core/http-core.service';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {

  private url = enviroment.urlLogin;

  hasProfile: boolean = false;

  private userBs$: BehaviorSubject<LoginResponseModel> = new BehaviorSubject<LoginResponseModel>(LoginResponseModel.Create());
  userObs$ = this.userBs$.asObservable();

  constructor(private http: HttpCoreService, private alertService: AlertService) { }

  register(registerModel: RegisterModel): Observable<RegisterResponse> {
    const fullUrl = this.url + 'register';
    return this.http.post$<RegisterResponse>(fullUrl, registerModel);
  }

  login(loginModel: LoginModel): void {
    const fullUrl = this.url + 'login';
    this.http.post$<LoginResponseModel>(fullUrl, loginModel).subscribe((res) => {
      this.userBs$.next(res);
      this.setSession(res);
    });
  }

  reAuthenticate(): Observable<LoginResponseModel> {
    const fullUrl = this.url + 'reauthenticate';
    const user: LoginResponseModel = this.getUser();
    const cmd: ReAuthenticateModel = {
      refresh_token: user.refresh_token,
      id_user: user.id_user
    };

    return this.http.post$<LoginResponseModel>(fullUrl, cmd);
  }

  logout() {
    this.userBs$.next(LoginResponseModel.Create());
    sessionStorage.clear();
  }

  isLogged(): boolean {
    const user = this.userBs$.value;
    return user.access_token !== undefined || this.getUserFromSession().access_token !== undefined;
  }

  setUser(user: LoginResponseModel) {
    this.userBs$.next(user);
  }

  getUser(): LoginResponseModel {
    const user = this.userBs$.value;
    return user || this.getUserFromSession();
  }

  getUserFromSession(): LoginResponseModel {
    const raw = sessionStorage.getItem('user');
    return raw ? JSON.parse(raw) as LoginResponseModel : {};
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

  private setSession(user: LoginResponseModel) {
    sessionStorage.setItem('user', JSON.stringify(user))
  }
}
