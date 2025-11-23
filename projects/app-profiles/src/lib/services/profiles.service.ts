import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../../app/src/enviroments/enviroment';
import { Observable } from 'rxjs';
import { PacientesModel } from '../components/pacientes/models/pacientes.interface';
import { HttpCoreService } from '../../../../app-core/src/lib/services/http-core/http-core.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private urlPacientes: string = enviroment.urlPacientes;
  private urlMedicos: string = enviroment.urlMedicos;
  constructor(private http: HttpCoreService) { }

  createPaciente(cmd: PacientesModel): Observable<any> {
    const fullUrl = this.urlPacientes + 'create';
    return this.http.post$(fullUrl, cmd);
  }
}
