import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor() {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !this.jwtHelper.isTokenExpired(token);
  }
  decodeToken() {
    const token = localStorage.getItem('accessToken');
    const dToken = this.jwtHelper.decodeToken(token!);
    return dToken;
  }

  IsAdmin() {
    const dToken = this.decodeToken();
    return dToken.IsAdmin === 'True';
  }
}
