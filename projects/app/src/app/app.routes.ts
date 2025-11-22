import { Routes } from '@angular/router';
import { AuthComponent } from '../../../app-login/src/lib/components/auth/auth.component';
import { authGuard } from './guards/auth/auth.guard';
import { PacientesComponent } from '../../../app-profiles/src/lib/components/pacientes/pacientes.component';
import { pacientesGuard } from './guards/paciente/pacientes.guard';
import { CreateProfileComponent } from '../../../app-profiles/src/lib/components/create-profile/create-profile.component';

export const routes: Routes = [
    {path: 'login', component: AuthComponent}, 
    // Perfiles
    {path: 'paciente', component: PacientesComponent,canActivate: [authGuard, pacientesGuard]},
    {path:'perfil/create', component:CreateProfileComponent, canActivate: [authGuard]}
];
