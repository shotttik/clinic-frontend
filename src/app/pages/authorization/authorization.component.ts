import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  providers: [MessageService],
})
export class AuthorizationComponent implements AfterContentInit {
  loginForm: FormGroup | undefined;

  emailError = '';
  passwordError = '';
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngAfterContentInit(): void {
    setTimeout(() => {}, 5);
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
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

  loginUser() {
    if (this.loginForm?.invalid) {
      this.displayErrors();

      return;
    }

    this.apiService.loginUser(this.loginForm!.value).subscribe(
      (suc: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'საჭიროა ვერიფიკაცია!',
          detail: 'ავტორიზაცია წარმატებით გაიარეთ.',
        });
        localStorage.setItem('accessToken', suc.token);
        // this.headerComponent.closeDialog(); @TODO close dialog
        this.router.navigate(['/profile']);
      },
      (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'ყურადღება!',
          detail: err.error,
        });
      }
    );
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
      }
    });
  }
}
