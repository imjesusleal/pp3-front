import { Injectable, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AlertService } from '../../../../app-core/src/lib/services/alert/alert.service';
import { delay, filter, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private pacienteOptions: string[] = ['perfil'];


  constructor(private router: Router, private alertService: AlertService) {
  }

  public goToLogin() {
    this.router.navigate(['auth', 'login'])
  }

  public goToRegister() {
    this.router.navigate(['auth', 'register'])
  }

  public createPerfil() {
    this.router.navigate(['profiles', 'create']);
  }

  public perfilPaciente() {
    this.router.navigate(['profiles', 'pacientes']);
  }

  public handlePacienteNav(nav: string) {
    if (!this.pacienteOptions.includes(nav)) {
      this.alertService.alert({ message: 'Ocurrio un error.' });
      return;
    }

    this.router.navigate(['profiles', 'pacientes', nav]);
  }
}
