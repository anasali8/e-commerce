import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { registerGuard } from './core/guards/register.guard';
import { loginGuard } from './core/guards/login.guard';
import path from 'path';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      {
        path: 'landing',
        loadComponent: () =>
          import('./pages/landing/landing.component').then(
            (m) => m.LandingComponent
          ),
          canActivate: [loginGuard],
      },
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
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then((h) => h.HomeComponent)
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then((c) => c.ContactComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component').then((c) => c.CartComponent),
      },
      {
        path: 'checkout',
        loadComponent: () => import('./pages/checkout/checkout.component').then((c) => c.CheckoutComponent)
      },
      {
      path: 'productDetails/:id',
        loadComponent: () => import('./pages/product-details/product-details.component').then((p) => p.ProductDetailsComponent)
      },
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
