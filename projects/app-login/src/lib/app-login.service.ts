import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RegisterModel, RegisterResponse } from './models/register.interface';
import { enviroment } from '../../../app/src/enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { LoginModel, LoginResponseModel } from './models/login.model';
import { ReAuthenticateModel } from './models/retauthenticate.interface';
import { PacientesModel } from './models/profiles.model';
import { AlertService } from '../../../app-core/src/lib/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {

  private url = enviroment.urlLogin;
  private pacientesUrl = enviroment.urlPacientes;
  private medicosUrl = enviroment.urlMedicos;

  hasProfile: boolean = false;

  private userBs$: BehaviorSubject<LoginResponseModel> = new BehaviorSubject<LoginResponseModel>(LoginResponseModel.Create());
  userObs$ = this.userBs$.asObservable();

  constructor(private http: HttpClient, private alertService: AlertService) { }

  register(registerModel: RegisterModel): Observable<RegisterResponse> {
    const fullUrl = this.url + 'register';
    return this.http.post<RegisterResponse>(fullUrl, registerModel);
  }

  login(loginModel: LoginModel): void {
    const fullUrl = this.url + 'login';
    this.http.post<LoginResponseModel>(fullUrl, loginModel).subscribe({
      next: res => {
        this.userBs$.next(res);

        if (res.user_rol) {
          // this.hasProfile = true;
        };
      },
      error: err => {
        this.alertService.alert({header:"Error", message:`Algo malo ha sucedido. ${err.error.detail}`});
      }
    });
  }


  reAuthenticate(): Observable<LoginResponseModel> {
    const fullUrl = this.url + 'reauthenticate';
    const user: LoginResponseModel = this.getUser();
    const cmd: ReAuthenticateModel = {
      refresh_token: user.refresh_token,
      id_user: user.id_user
    };

    return this.http.post<LoginResponseModel>(fullUrl, cmd);
  }

  isLogged(): boolean {
    return this.userBs$.value.access_token !== undefined;
  }

  setUser(user: LoginResponseModel) {
    this.userBs$.next(user);
  }

  getUser(): LoginResponseModel {
    return this.userBs$.value;
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
}
