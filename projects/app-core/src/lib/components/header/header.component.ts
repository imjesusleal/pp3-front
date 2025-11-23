import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppLoginService } from '../../../../../app-login/src/public-api';
import { NavigationService } from '../../../../../app/src/app/services/navigation.service';
import { shield, logOutOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { UserRoles } from '../../../../../app-login/src/lib/models/user_roles.enum';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  shieldSvg = shield;
  logOutOutlineSvg = logOutOutline;

  esMedico: boolean;


  constructor(private authService: AppLoginService, private navService: NavigationService) {
    const user = this.authService.getUser();
    this.esMedico = user.user_rol === UserRoles.Medicos;
  }

  ngOnInit(): void {
    addIcons({ shield, logOutOutline });
  }

  handleLogout() {
    this.authService.logout();
    this.navService.goToLogin();
  }

  handleNav(nav: string){
    this.navService.handlePacienteNav(nav);
  }

  backToHome() {
    if (!this.esMedico) {
      this.navService.perfilPaciente();
    }
  }

}
