import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ), children:
      [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', loadComponent: () => import('./pages/login/login.component').then(l => l.LoginComponent) },
        { path: 'register', loadComponent: () => import('./pages/register/register.component').then(r => r.RegisterComponent) }
      ]
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./layout/user-layout/user-layout.component').then(
        (m) => m.UserLayoutComponent
      ),
    canActivate: [authGuard],
  },
];
