import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCoreService } from '../../../../../../../app-core/src/lib/services/http-core/http-core.service';
import { enviroment } from '../../../../../../../app/src/enviroments/enviroment';
import { PacientesModel } from '../../models/pacientes.interface';

@Injectable({
  providedIn: 'root'
})
export class PacientesHttpService {

  private pacientesUrl: string = enviroment.urlPacientes; 
  constructor(public http: HttpCoreService) { }

  get(user_id: number): Observable<PacientesModel> {
    const fullUrl = this.pacientesUrl + 'get';
    const cmd = {
      user_id: user_id
    };
    return this.http.get$<PacientesModel>(fullUrl, cmd)
  }
}
