import { Injectable, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AlertService } from '../../../../app-core/src/lib/services/alert/alert.service';
import { delay, filter, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private pacienteOptions: string[] = ['perfil'];

  private lastRouteKey: string = 'lastRoute';
  private restored: boolean = false;

  constructor(private router: Router, private alertService: AlertService) {
  }

  init(): void {
    if (typeof window === 'undefined') return;

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        filter(() => !!localStorage.getItem(this.lastRouteKey)),
        take(1)
      )
      .subscribe(() => {
        this.restoreLastRoute();
      });
  };


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

  restoreLastRoute() {
    if (this.restored) return;
    this.restored = true;

    const last = localStorage.getItem(this.lastRouteKey);
    if (!last) return;
    this.router.navigateByUrl(last).catch(err => {
      console.warn('No se pudo restaurar la ruta:', err);
    });
  }
}
