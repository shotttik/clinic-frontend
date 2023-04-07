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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements AfterViewInit {
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent | undefined;
  registerForm: FormGroup | undefined;

  firstNameError = '';
  lastNameError = '';
  emailError = '';
  pidError = '';
  passwordError = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiServices: ApiService,
    private messageService: MessageService
  ) {}

  ngAfterViewInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      lastName: new FormControl('', [Validators.required]),
      pid: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]+$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*\\W).+$'),
      ]),
    });
  }

  registerUser() {
    if (this.registerForm?.invalid) {
      this.displayErrors();
      return;
    }

    let data = JSON.stringify(this.registerForm!.value);
    this.apiServices.registerUser(data).subscribe(
      (suc: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'საჭიროა ვერიფიკაცია!',
          detail: 'გთხოვთ შეამოწმოთ მეილი.',
        });
        this.headerComponent!.openDialog();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'ყურადღება!',
          detail: err.error,
        });
      }
    );
  }

  setFirstNameValue(value: any) {
    this.registerForm!.controls['firstName'].setValue(value);
    this.firstNameError = '';
    return value;
  }
  setEmailValue(value: any) {
    this.registerForm!.controls['email'].setValue(value);
    this.emailError = '';
    return value;
  }
  setPasswordValue(value: any) {
    this.registerForm!.controls['password'].setValue(value);
    this.passwordError = '';
    return value;
  }
  setPidValue(value: any) {
    this.registerForm!.controls['pid'].setValue(value);
    this.pidError = '';
    return value;
  }
  setLastNameValue(value: any) {
    this.registerForm!.controls['lastName'].setValue(value);
    this.lastNameError = '';
    return value;
  }

  getFormValidationErrors() {
    const result: { control: string; error: string; value: any }[] = [];
    Object.keys(this.registerForm!.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null =
        this.registerForm!.get(key)!.errors;
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

  displayErrors() {
    const errors = this.getFormValidationErrors();
    errors.forEach((e) => {
      if (e.control == 'firstName') {
        if (e.error == 'required') {
          this.firstNameError = 'ეს ველი აუცილებელია';
        }
        if (e.error == 'minlength') {
          this.firstNameError = 'მინიმუმ 5 სიმბოლო';
        }
      }
      if (e.control == 'lastName') {
        if (e.error == 'required') {
          this.lastNameError = 'ეს ველი აუცილებელია';
        }
      }
      if (e.control == 'pid') {
        if (e.error == 'required') {
          this.pidError = 'ეს ველი აუცილებელია';
        }
        if (
          e.error == 'minlength' ||
          e.error == 'maxlength' ||
          e.error == 'pattern'
        ) {
          this.pidError = 'შედგებოდეს 11 რიცხვისგან';
        }
      }
      if (e.control == 'email') {
        if (e.error == 'required') {
          this.emailError = 'ეს ველი აუცილებელია';
        }
        if (e.error == 'email') {
          this.emailError = 'არასწორი იმეილის ფორმატი';
        }
      }
      if (e.control == 'password') {
        if (e.error == 'required') {
          this.passwordError = 'ეს ველი აუცილებელია';
        }
        if (e.error == 'minlength') {
          this.passwordError = 'უნდა შეიცავდეს 8 სიმბოლოს';
        }
        if (e.error == 'pattern') {
          this.passwordError =
            'უნდა შეიცავდეს რიცხვს, სიმბოლოს, დიდ/პატარა ასო';
        }
      }
    });
  }
}
