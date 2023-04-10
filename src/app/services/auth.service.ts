import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor() {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    let isExpired = !this.jwtHelper.isTokenExpired(token);
    isExpired ? '' : localStorage.removeItem('accessToken');
    return isExpired;
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
  getFormValidationErrors(form: FormGroup) {
    const result: { control: string; error: string; value: any }[] = [];
    Object.keys(form.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null = form.get(key)!.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach((keyError) => {
          result.push({
            control: key,
            error: keyError,
            value: controlErrors[keyError],
          });
        });
      }
    });
    return result;
  }
}
