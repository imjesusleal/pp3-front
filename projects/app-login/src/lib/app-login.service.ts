import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RegisterModel, RegisterResponse } from './models/register.interface';
import { enviroment } from '../../../app/src/enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { LoginModel, LoginResponseModel } from './models/login.model';
import { ReAuthenticateModel } from './models/retauthenticate.interface';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {

  private url = enviroment.urlLogin;
  private userBs$: BehaviorSubject<LoginResponseModel> = new BehaviorSubject<LoginResponseModel>(LoginResponseModel.Create());
  constructor(private http: HttpClient) { }

  register(registerModel: RegisterModel): Observable<RegisterResponse>{
    const fullUrl = this.url + 'register';
    return this.http.post<RegisterResponse>(fullUrl, registerModel);
  }

  login(loginModel: LoginModel): void{
    const fullUrl = this.url + 'login';
    this.http.post<LoginResponseModel>(fullUrl, loginModel).subscribe((res) => {
      this.userBs$.next(res);
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

  setUser(user: LoginResponseModel){
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
