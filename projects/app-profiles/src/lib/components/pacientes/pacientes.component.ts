import { Component, OnInit } from '@angular/core';
import { AppLoginService } from '../../../../../app-login/src/public-api';
import { PacientesModel } from './models/pacientes.interface';
import { NavigationService } from '../../../../../app/src/app/services/navigation.service';
import { HeaderComponent } from '../../../../../app-core/src/lib/components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterOutlet } from '@angular/router';
import { AlertService } from '../../../../../app-core/src/lib/services/alert/alert.service';
import { PacientesHttpService } from './services/http/pacientes-http.service';
import { switchMap, tap } from 'rxjs';
import { PacientesDataService } from './services/data/pacientes-data.service';

@Component({
  selector: 'lib-pacientes',
  standalone: true,
  imports: [HeaderComponent, IonicModule, RouterOutlet],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent implements OnInit {

  paciente!: PacientesModel;

  constructor(private authService: AppLoginService,
    private http: PacientesHttpService, 
    private dataService: PacientesDataService) {
  }

  ngOnInit(): void {
    this.getPerfil();
  }

  private getPerfil() {
    const user = this.authService.getUser();
    this.http.get(user.id_user!).subscribe(((res: PacientesModel) => this.dataService.updatePerfil(res)));
  }
}

