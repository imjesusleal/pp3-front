import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterModel } from "../models/register-model.interface";
import { Observable } from "rxjs";

Injectable({providedIn: "root"})
export class CoreHttpService {

    urlMedify: string = "http://127.0.0.1:8001/api/v1/";

    constructor(private http: HttpClient) {
    }

    register(registerModel: RegisterModel): Observable<any> {
        const fullUrl = this.urlMedify + "auth/register";
        return this.http.post(fullUrl, registerModel);
    }
}