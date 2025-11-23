import { Routes } from '@angular/router';
import { AuthComponent } from '../../../app-login/src/lib/components/auth/auth.component';
import { authGuard } from './guards/auth/auth.guard';
import { PacientesComponent } from '../../../app-profiles/src/lib/components/pacientes/pacientes.component';
import { pacientesGuard } from './guards/paciente/pacientes.guard';
import { CreateProfileComponent } from '../../../app-profiles/src/lib/components/create-profile/create-profile.component';
import { RegisterComponent } from '../../../app-login/src/lib/components/register/register.component';
import { PerfilComponent } from '../../../app-profiles/src/lib/components/pacientes/components/perfil/perfil.component';
import { HomeComponent } from '../../../app-profiles/src/lib/components/pacientes/components/home/home.component';

export const routes: Routes = [
    {path: 'login', component: AuthComponent}, 
    {path:'register', component: RegisterComponent},
    // Perfiles
    {
        path: 'paciente', 
        component: PacientesComponent,
        canActivate: [authGuard, pacientesGuard],
        children:[
            {path: '', component: HomeComponent, canActivate: [authGuard, pacientesGuard]},
            {path: 'perfil', component: PerfilComponent, canActivate: [authGuard, pacientesGuard]}
        ]
    },
    {path:'perfil/create', component:CreateProfileComponent, canActivate: [authGuard]}
];
