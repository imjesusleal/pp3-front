import { Routes } from "@angular/router";
import { authGuard } from "../../../app/src/app/guards/auth/auth.guard";
import { pacientesGuard } from "../../../app/src/app/guards/paciente/pacientes.guard";

export const PROFILES_ROUTES: Routes = [
        
    // Perfiles
    {
        path: 'pacientes', 
        loadComponent: () => import('./components/pacientes/pacientes.component').then(m => m.PacientesComponent),
        canActivate: [pacientesGuard],
        children:[
            {
                path: '', 
                loadComponent: () => import('./components/pacientes/components/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'perfil', 
                loadComponent: () => import('./components/pacientes/components/perfil/perfil.component').then(m => m.PerfilComponent)
            }
        ]
    }, 
    {
        path:'create', 
        loadComponent: () => import('./components/create-profile/create-profile.component').then(m => m.CreateProfileComponent)
    }
]