import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.auth.getRole();
    const allowedRoles = route.data?.['roles'];

    if (!allowedRoles || !userRole || !allowedRoles.includes(userRole)) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
