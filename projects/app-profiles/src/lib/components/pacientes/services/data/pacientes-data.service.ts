import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PacientesModel } from '../../models/pacientes.interface';

@Injectable({
  providedIn: 'root'
})
export class PacientesDataService {

  private pacientePerfilDataBs: BehaviorSubject<PacientesModel>;
  public pacientePerfilObs$: Observable<PacientesModel>
  constructor() { 
    this.pacientePerfilDataBs = new BehaviorSubject<PacientesModel>({} as PacientesModel);
    this.pacientePerfilObs$ = this.pacientePerfilDataBs.asObservable();
  }

  updatePerfil(model: PacientesModel) {
    this.pacientePerfilDataBs.next(model);
  }
}
