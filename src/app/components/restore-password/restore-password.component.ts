import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css'],
})
export class RestorePasswordComponent implements OnInit {
  @Output() restorePasswordEvent = new EventEmitter<boolean>();
  sendCodeForm: FormGroup | undefined;
  restoreForm: FormGroup | undefined;
  restorePassword = false;

  emailError = '';
  passwordError = '';
  codeError = '';
  confirmPasswordError = '';
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sendCodeForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.restoreForm = this.formBuilder.group(
      {
        code: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*\\W).+$'),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: this.authService.MustMatch('password', 'confirmPassword'),
      }
    );
  }

  setEmailValue(value: any) {
    this.sendCodeForm!.controls['email'].setValue(value);
    this.emailError = '';
    return value;
  }

  setCodeValue(value: any) {
    this.restoreForm!.controls['code'].setValue(value);
    this.codeError = '';
    return value;
  }
  setPasswordValue(value: any) {
    this.restoreForm!.controls['password'].setValue(value);
    this.passwordError = '';
    return value;
  }
  setConfirmPasswordValue(value: any) {
    this.restoreForm!.controls['confirmPassword'].setValue(value);
    this.confirmPasswordError = '';
    return value;
  }

  loadLoginPage() {
    this.restorePasswordEvent.emit(false);
  }

  sendEmailCode() {
    if (this.sendCodeForm?.invalid) {
      this.displayErrors(this.sendCodeForm);
      return;
    }
    this.apiService.createRestoreCode(this.sendCodeForm!.value).subscribe(
      (suc: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'წარმატებული!',
          detail: 'კოდი გამოიგზავნა.',
        });
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'ყურადღება!',
          detail: err.error,
        });
      }
    );
    this.codeError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
  }
  restore() {
    if (this.restoreForm!.invalid || this.sendCodeForm!.invalid) {
      this.displayErrors(this.restoreForm!);
      this.displayErrors(this.sendCodeForm!);
      return;
    }

    this.apiService
      .resetPassword({
        ...this.restoreForm!.value,
        ...this.sendCodeForm!.value,
      })
      .subscribe(
        (suc: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'წარმატებული!',
            detail: 'პაროლი წარმატებით შეიცვალა.',
          });
          this.loadLoginPage();
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

  displayErrors(form: FormGroup) {
    const errors = this.authService.getFormValidationErrors(form!);
    console.log(errors);
    errors.forEach((e) => {
      if (e.control == 'email') {
        if (e.error == 'required') {
          this.emailError = 'ეს ველი აუცილებელია';
        }
        if (e.error == 'email') {
          this.emailError = 'არასწორი იმეილის ფორმატი';
        }
      }
      if (e.control == 'code') {
        if (e.error == 'required') {
          this.codeError = 'ეს ველი აუცილებელია';
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
      if (e.control == 'confirmPassword') {
        if (e.error == 'required') {
          this.confirmPasswordError = 'ეს ველი აუცილებელია';
        }
        if (e.error == 'minlength') {
          this.confirmPasswordError = 'უნდა შეიცავდეს 8 სიმბოლოს';
        }
        if (e.error == 'pattern') {
          this.confirmPasswordError =
            'უნდა შეიცავდეს რიცხვს, სიმბოლოს, დიდ/პატარა ასო';
        }
        console.log(e);
        if (e.error == 'mismatch') {
          this.confirmPasswordError = 'პაროლები არემთხვევა';
        }
      }
    });
  }
}
