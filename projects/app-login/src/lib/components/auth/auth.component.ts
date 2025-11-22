import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'lib-auth',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  screen: 'login' | 'login-doctor' | 'register' = 'login';

  patientEmail = 'paciente@medify.com';
  patientPassword = 'password';

  doctorEmail = 'doctor@medify.com';
  doctorPassword = 'password';

  constructor() {}

  handleLogin(role: 'patient' | 'doctor') {
    if (role === 'patient') {
      console.log('Login paciente:', this.patientEmail, this.patientPassword);
    } else {
      console.log('Login doctor:', this.doctorEmail, this.doctorPassword);
    }
  }
}

