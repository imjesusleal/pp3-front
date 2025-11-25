import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';
import { pacientesGuard } from './guards/paciente/pacientes.guard';

export const routes: Routes = [

    //Home
    {
        path:'',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    //Auth
    {
        path:'auth',
        loadChildren: () => import('../../../app-login/src/lib/auth.routes').then(m => m.AUTH_ROUTES)
    },
    //Profiles
    {
        path:'profiles',
        loadChildren: () => import('../../../app-profiles/src/lib/profiles.routes').then(m => m.PACIENTES_ROUTES),
        canActivate: [authGuard, pacientesGuard]
    }
];
