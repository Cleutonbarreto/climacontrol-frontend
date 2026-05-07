import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {

  const authService = inject(AuthService);
  const router = inject(Router);

  //  Se autenticado → libera acesso
  if (authService.isAuthenticated()) {
    return true;
  }

  //  Redireciona para login + guarda a rota que tentou acessar
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};