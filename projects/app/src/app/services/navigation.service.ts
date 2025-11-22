import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  public goToLogin() {
    this.router.navigate(['login'])
  }

  public createPerfil() {
    this.router.navigate(['perfil/create']);
  }

  public perfilPaciente() {
    this.router.navigate(['paciente']);
  }
}
