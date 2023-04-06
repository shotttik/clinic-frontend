import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { InputComponent } from 'src/app/elements/input/input.component';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements AfterViewInit {
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent | undefined;
  @ViewChild('firstNameInput')
  firstNameInput: InputComponent | undefined;
  @ViewChild('lastNameInput')
  lastNameInput: InputComponent | undefined;
  @ViewChild('passwordInput')
  passwordInput: InputComponent | undefined;
  @ViewChild('emailInput')
  emailInput: InputComponent | undefined;
  @ViewChild('pidInput')
  pidInput: InputComponent | undefined;
  registerForm: FormGroup | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiServices: ApiService
  ) {}

  ngAfterViewInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      lastName: new FormControl('', [Validators.required]),
      pid: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  validateControl = (controlName: string) => {
    return (
      this.registerForm!.get(controlName)!.invalid &&
      this.registerForm!.get(controlName)!.touched
    );
  };

  hasError = (controlName: string, errorName: string) => {
    return this.registerForm!.get(controlName)!.hasError(errorName);
  };

  registerUser() {
    if (this.registerForm?.invalid) {
      console.log('araswori formaa');
      console.log(this.registerForm.value);
      return;
    }

    // let data = JSON.stringify(this.registerForm.value);
    // this.apiServices.registerUser(data).subscribe({
    //   next: (response: any) => {
    //     console.log(response), this.headerComponent?.openDialog();
    //   },
    //   error: (response: any) => {
    //     console.log(response);
    //   },
    // });
  }
  setFirstNameValue(value: any) {
    this.registerForm!.controls['firstName'].setValue(value);
    return value;
  }
  setEmailValue(value: any) {
    this.registerForm!.controls['email'].setValue(value);
    return value;
  }
  setPasswordValue(value: any) {
    this.registerForm!.controls['password'].setValue(value);
    return value;
  }
  setPidValue(value: any) {
    this.registerForm!.controls['pid'].setValue(value);
    return value;
  }
  setLastNameValue(value: any) {
    this.registerForm!.controls['lastName'].setValue(value);
    return value;
  }
}
