import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  // if user is logged in don't allow access to login and register pages
  const authService = inject(AuthService);
  const isLoggedIn = authService.authorized();
    const router = inject(Router);

  if (isLoggedIn) {
    return router.createUrlTree(['/user']);
  } else {
    return true;
  }
};
