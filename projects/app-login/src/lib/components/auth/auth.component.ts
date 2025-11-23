import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavigationService } from '../../../../../app/src/app/services/navigation.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { eye, eyeOff } from 'ionicons/icons'
import { AppLoginService } from '../../app-login.service';
import { LoginModel } from '../../models/login.model';

@Component({
  selector: 'lib-auth',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  fg!: FormGroup;
  showPassword: boolean = false;

  constructor(private navService: NavigationService, private authService: AppLoginService) {}
  
  
  ngOnInit(): void {
    this.fg = this.getFg();
    addIcons({eye, eyeOff});
  }

  handleLogin() {
    this.authService.login(this.cmd);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  navToRegister() {
    this.navService.goToRegister()
  }

  private getFg(): FormGroup {
    return new FormGroup({
      username: new FormControl('', [Validators.required, this.validateUsername]), 
      password: new FormControl('', [Validators.required])
    })
  }

  private validateUsername(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return typeof control == 'string' ? null : {error: {value: control.value}} 
    }
  }

  private get cmd(): LoginModel {
    const formValues = this.fg.getRawValue();

    return {
      username: formValues.username,
      password: formValues.password
    } as LoginModel;
  }
}

