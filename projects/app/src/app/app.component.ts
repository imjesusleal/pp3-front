import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common';
import { AppLoginService } from '../../../app-login/src/public-api';
import { UserRoles } from '../../../app-login/src/lib/models/user_roles.enum';
import { NavigationService } from './services/navigation.service';
import { LoginResponseModel } from '../../../app-login/src/lib/models/login.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IonicModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {

  constructor(private authService: AppLoginService, private navService: NavigationService) {

  }

  ngAfterViewInit(): void {
    this.authService.userObs$.subscribe((res) => {
      if (!res.access_token) {
        return;
      }
      this.handleNavigation(res);
    })
  }

  private handleNavigation(res: LoginResponseModel) {
    if (!res.user_rol) {
      this.navService.createPerfil();
    }

    if (res.user_rol == UserRoles.Pacientes) {
      this.navService.perfilPaciente();
    }
  }
}
