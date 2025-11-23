import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ProfileCardComponent } from '../../../../../../../app-core/src/lib/components/profile-card/profile-card.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { AppLoginService } from '../../../../../../../app-login/src/public-api';
import { LoginResponseModel } from '../../../../../../../app-login/src/lib/models/login.model';
import { PacientesModel } from '../../models/pacientes.interface';
import { PacientesDataService } from '../../services/data/pacientes-data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { personOutline, documentTextOutline, idCardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UpdatePerfilComponent } from '../../dialogs/update-perfil/update-perfil.component';

@Component({
  selector: 'lib-perfil',
  standalone: true,
  imports: [ProfileCardComponent, IonicModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit, AfterViewInit {

  user: LoginResponseModel;
  paciente!: PacientesModel;

  fg: FormGroup;

  constructor(private authService: AppLoginService, 
    private dataService: PacientesDataService,
    private updateModalCtrl: ModalController
  ) {
    this.user = this.authService.getUser();
    this.fg = this.getFg();
    addIcons({personOutline, documentTextOutline, idCardOutline});
  }
  
  ngOnInit(): void {
    this.dataService.pacientePerfilObs$.subscribe((res) => {
      this.paciente = res;
    });
  } 

  ngAfterViewInit(): void {
    this.dataService.pacientePerfilObs$.subscribe((res) => {
      this.paciente = res;
    })
  }

  getFg(): FormGroup {
    return new FormGroup({
      id_paciente: new FormControl(),
      id_user: new FormControl(this.user.id_user),
      documento_identificativo: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl()
    });
  }

  transformDocumento() {
    return this.paciente.documento_identificativo == 1 ? "DNI" : "Otros";
  }

  async onEditarPerfil() {
    const modal = await this.updateModalCtrl.create({
      component: UpdatePerfilComponent
    });

    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role == 'confirm') {
      alert("salio por ok");
    }else {
      alert("salio por cancel");
    }
  }

}
