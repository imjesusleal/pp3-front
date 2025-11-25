import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../../../app-core/src/lib/components/header/header.component';
import { AppLoginService } from '../../../../../app-login/src/public-api';
import { LoginResponseModel } from '../../../../../app-login/src/lib/models/login.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PacientesModel } from '../pacientes/models/pacientes.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicosModel } from '../medicos/models/medicos.interface';
import { UserRoles } from '../../../../../app-login/src/lib/models/user_roles.enum';
import { ProfilesService } from '../../services/profiles.service';
import { NavigationService } from '../../../../../app/src/app/services/navigation.service';

@Component({
  selector: 'lib-create-profile',
  standalone: true,
  imports: [HeaderComponent, IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.css'
})
export class CreateProfileComponent implements OnInit {

  user!: LoginResponseModel;
  esPaciente!: boolean;

  perfilPaciente!: PacientesModel;
  perfilMedico!: MedicosModel;

  fg!: FormGroup;

  editForm: boolean = true;

  constructor(private authService: AppLoginService, 
    private http: ProfilesService, 
    private navService: NavigationService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.esPaciente = this.user.user_rol === UserRoles.Pacientes;
  
    this.fg = this.getFg()
  }

  private getFg(): FormGroup{
    return this.esPaciente 
    ? new FormGroup({
      documentoIdentificativo: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required])
    })
    : new FormGroup({

    })
  }

  submit(){
    if (this.esPaciente) {
      this.http.createPaciente(this.cmdPaciente).subscribe((res) => {
        this.navService.perfilPaciente();
      }); 
    }
  }

  private get cmdPaciente(): PacientesModel{
    const formValues = this.fg.getRawValue();
    return {
      documento_identificativo: Number(formValues.documentoIdentificativo),
      nombre: formValues.nombre,
      apellido: formValues.apellido,
      id_user: this.user.id_user
    }as PacientesModel
  }

}

