import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationService } from '../../../../../app/src/app/services/navigation.service';
import { eye, eyeOff, chevronDownOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { UserRoles } from '../../models/user_roles.enum';
import { RegisterModel } from '../../models/register.interface';
import { AppLoginService } from '../../app-login.service';
import { AlertService } from '../../../../../app-core/src/lib/services/alert/alert.service';

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  showPassword: boolean = false;

  fg!: FormGroup;

  constructor(private navService: NavigationService, 
    private authService: AppLoginService, 
    private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.fg = this.getFg();
    addIcons({ eye, eyeOff, chevronDownOutline });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  navToLogin() {
    this.navService.goToLogin();
  }

  handleRegister() {
    this.authService.register(this.cmd).subscribe({
      next: (res) => {
        this.alertService.alert$({header: 'Usuario generado correctamente!', message: 'Su usuario ha sido generado correctamente, será redirigido al login.'}).subscribe(() => {
          this.navService.goToLogin();
        });
      },
      error: (err) => {
        this.alertService.alert({message: `Un error ha ocurrido durante el registro: ${err.error.detail}` })
      }
    })
  }

  private getFg(): FormGroup {
    return new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      userRol: new FormControl('', [Validators.required, this.roleIn(UserRoles.Medicos, UserRoles.Pacientes)])
    });
  }

  private roleIn(...validRoles: number[]): ValidatorFn {
    return control =>
      validRoles.includes(Number(control.value))
        ? null
        : { roleNotAllowed: true };
  }

  private get cmd(): RegisterModel {
    const formValues = this.fg.getRawValue();
    return {
      username: formValues.username,
      password: formValues.password,
      email: formValues.email,
      user_rol: formValues.userRol
    } as RegisterModel;
  }

}
