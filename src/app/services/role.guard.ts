import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const IsAdmin = route.data['IsAdmin'];
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.router.navigate(['/register']);
      return false;
    }
    const tokenPayload: any = decode(token!);
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/register']);
      localStorage.clear();
      return false;
    }
    if (IsAdmin) {
      return tokenPayload.IsSuperUser == 'True';
    }
    return true;
  }
}
