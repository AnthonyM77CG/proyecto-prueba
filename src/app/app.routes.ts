import { Routes } from '@angular/router';
import { NoEncontrado } from './features/public/no-encontrado/no-encontrado';
import { Inicio } from './features/public/inicio/inicio';
import { Locales } from './features/public/locales/locales';
import { Nosotros } from './features/public/nosotros/nosotros';
import { Contacto } from './features/public/contacto/contacto';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/layouts/public-layout/public-layout').then(c => c.PublicLayout),
        children: [
            { path: 'inicio', component: Inicio },
            { path: 'locales', component: Locales },
            { path: 'nosotros', component: Nosotros },
            { path: 'contacto', component: Contacto },
            { path: 'login', component: Login },
            { path: 'register', component: Register },
            { path: '', redirectTo: 'inicio', pathMatch: "full" },
        ]
    },

    {
        path: 'admin', 
        loadComponent: () => import('./shared/layouts/admin-layout/admin-layout').then(c => c.AdminLayout),
        canActivate: [authGuard],
        data: { role: 'ADMIN' },
        children: [
            {
                path: '',
                loadChildren: () => import('./features/private/admin/routes/admin-module').then(m => m.AdminModule),
            },
        ]
    },

    {
        path: 'user', 
        loadComponent: () => import('./shared/layouts/user-layout/user-layout').then(c => c.UserLayout),
        canActivate: [authGuard],
        data: { role: 'USER' },
        children:[
            {
                path: '',
                loadChildren: () => import('./features/private/user/routes/user-module').then(c=>c.UserModule),
            }
        ]
    },

    { path: '**', component: NoEncontrado }
];
