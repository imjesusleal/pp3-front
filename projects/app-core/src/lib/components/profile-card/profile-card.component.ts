import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoginResponseModel } from '../../../../../app-login/src/lib/models/login.model';
import { UserRoles } from '../../../../../app-login/src/lib/models/user_roles.enum';
import { AppLoginService } from '../../../../../app-login/src/public-api';
import { PacientesModel } from '../../../../../app-profiles/src/lib/components/pacientes/models/pacientes.interface';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavigationService } from '../../../../../app/src/app/services/navigation.service';
import { AlertService } from '../../services/alert/alert.service';
import { DownloadService } from '../../services/download/download.service';
import { switchMap, tap } from 'rxjs';
import { MedicosModel } from '../../../../../app-profiles/src/lib/components/medicos/models/medicos.interface';
@Component({
  selector: 'lib-profile-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent implements OnInit {



  @Input('user') user!: LoginResponseModel;
  @Input('pacientePerfil') paciente?: PacientesModel;
  @Input('medicoPerfil') medico?:MedicosModel;

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  esMedico!: boolean;


  profileImage?: string;
  userInitial!: string;

  allowedTypes: string[] = ['pdf', 'jpg', 'jpeg']

  constructor(private alertService: AlertService,
    private navService: NavigationService,
    private authService: AppLoginService,
    private downloadService: DownloadService
  ) {

  }

  ngOnInit(): void {
    if (!this.user) {
      this.handleUserNotFound();
    }
    this.esMedico = this.user.user_rol === UserRoles.Medicos;
    this.userInitial = this.esMedico ? "M" : "P"
    if (this.paciente?.img_name) {
      this.handleDownload(this.paciente.img_name);
    }

    if (this.medico?.img_name) {
      this.handleDownload(this.medico.img_name);
    }
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const extension = file.name.split('.')[1];

    if (!this.allowedTypes.includes(extension)) {
      this.alertService.alert({ header: 'formato invalido.', message: 'El formato es invalido, solo se aceptan pdfs, jpg y jpeg.' });
      return;
    }

    this.downloadService.upload$(file).pipe(
      switchMap(res => this.downloadService.download$(res)),
      tap(res => {
        const reader = new FileReader();
        reader.onload = () => {
          this.profileImage = reader.result as string;
        };
        reader.readAsDataURL(res);
      })
    ).subscribe();

  }

  private handleDownload(img_name: string) {
    this.downloadService.download$(img_name).subscribe((res) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string;
      };
      reader.readAsDataURL(res);

    });
  }

  private handleUserNotFound() {
    this.alertService.alert$({ header: 'No se ha enviado el usuario.', message: 'El usuario no ha sido encontrado, se redirige al login. ' }).subscribe(() => {
      this.authService.logout();
      this.navService.goToLogin();
    })
  }
}
