import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToolsService } from 'src/app/services/tools.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @Output() loginEvent = new EventEmitter<boolean>();

  loginForm: FormGroup | undefined;
  restorePassword = false;

  emailError = '';
  passwordError = '';
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*\\W).+$'),
      ]),
    });
  }

  setPasswordValue(value: any) {
    this.loginForm!.controls['password'].setValue(value);
    this.passwordError = '';
    return value;
  }
  setEmailValue(value: any) {
    this.loginForm!.controls['email'].setValue(value);
    this.emailError = '';
    return value;
  }
  loadRestoreComp() {
    this.loginEvent.emit(true);
  }
  loginUser() {
    if (this.loginForm?.invalid) {
      this.displayErrors();

      return;
    }

    this.apiService.loginUser(this.loginForm!.value).subscribe({
      next: (suc) => {
        this.messageService.add({
          severity: 'success',
          summary: 'საჭიროა ვერიფიკაცია!',
          detail: 'ავტორიზაცია წარმატებით გაიარეთ.',
        });
        localStorage.setItem('accessToken', suc.token);
        this.dialog.closeAll();

        let navgateUrl = 'profile';
        if (this.authService.IsAdmin()) navgateUrl = 'admin';
        this.router.navigate([navgateUrl]);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'ყურადღება!',
          detail: err.error,
        });
      },
    });
  }

  displayErrors() {
    const errors = this.authService.getFormValidationErrors(this.loginForm!);
    errors.forEach((e) => {
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
