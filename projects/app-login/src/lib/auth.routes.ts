import { Routes } from "@angular/router";
import { AppLoginComponent } from "./app-login.component";

export const AUTH_ROUTES: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AppLoginComponent,
        children: [
            {
                path: 'login',
                loadComponent: () => import('../../../app-login/src/lib/components/auth/auth.component').then(m => m.AuthComponent),
            },
            {
                path: 'register',
                loadComponent: () => import('../../../app-login/src/lib/components/register/register.component').then(m => m.RegisterComponent)
            }
        ]
    }

]