import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../../app-core/src/lib/services/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private pacienteOptions: string[] = ['perfil'];
 
  constructor(private router: Router, private alertService: AlertService) { }

  public goToLogin() {
    this.router.navigate(['login'])
  }

  public goToRegister() {
    this.router.navigate(['register'])
  }

  public createPerfil() {
    this.router.navigate(['perfil/create']);
  }

  public perfilPaciente() {
    this.router.navigate(['paciente']);
  }

  public handlePacienteNav(nav: string) {
    if (!this.pacienteOptions.includes(nav)) {
      this.alertService.alert({message:'Ocurrio un error.'});
      return;
    }

    this.router.navigate(['paciente',nav]);
  }
}
