import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { registerGuard } from './core/guards/register.guard';
import { loginGuard } from './core/guards/login.guard';
import path from 'path';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((l) => l.LoginComponent),
        canActivate: [loginGuard],
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (r) => r.RegisterComponent
          ),
          canDeactivate: [registerGuard],
      },
    ],
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./layout/user-layout/user-layout.component').then(
        (m) => m.UserLayoutComponent
      ),
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },

        {
          path:'home',
          loadComponent: ()=> import('./pages/home/home.component').then((h)=> h.HomeComponent)
        }
      ],
    canActivate: [authGuard],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (n) => n.NotFoundComponent
      ),
  }


];
