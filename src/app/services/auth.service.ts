import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../interfaces/User';

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

  getUserData(): User | undefined {
    let user: User;
    const RoleChoice = new Map<string, string>();
    RoleChoice.set('Doctor', 'ექიმი');
    RoleChoice.set('User', 'მომხმარებელი');
    RoleChoice.set('Admin', 'ადმინისტრატორი');

    user = this.decodeToken();
    if (!user) {
      return undefined;
    }
    user.Role = RoleChoice.get(user.Role)!;
    return user;
  }

  IsAdmin() {
    const dToken = this.decodeToken();
    return dToken.Role === 'Admin';
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

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mismatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mismatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
