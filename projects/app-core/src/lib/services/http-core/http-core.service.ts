import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCoreService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  get$<T>(url: string, params?: any, errorMsg?: string):Observable<T> {
    return this.http.get<T>(url, {params: params, observe: 'body'}).pipe(
      catchError((err) => {
        this.alertService.alert$({message: errorMsg ?? 'Error: ' + `${err}`}); 
        return EMPTY;
      })
    )
  }

  post$<T>(url: string, params?: any, errorMsg?: string):Observable<T> {
    return this.http.post<T>(url, params).pipe(
      catchError((err) => {
        console.log(err.error);
        return this.alertService.alert$({message: errorMsg ?? 'Error: ' + `${err.error}`});
      })
    )
  }

  download$(url: string, params?: any, errorMsg?:string):Observable<Blob> {
    return this.http.post(url, params, {responseType: 'blob'}).pipe(
      catchError((err) => {
        console.log(err.error);
        return this.alertService.alert$({message: errorMsg ?? 'Error: ' + `${err.error}`});
      })
    )
  }
}
