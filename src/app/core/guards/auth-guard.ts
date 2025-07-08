import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authServ = inject(AuthService);
  const router = inject(Router);

  return authServ.isAuth$.pipe(
    take(1),
    map(isAuth => {
      if (isAuth) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );

};
