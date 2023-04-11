import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
export class RestorePasswordComponent {
  @Output() restorePasswordEvent = new EventEmitter<boolean>();
  restoreForm: FormGroup | undefined;
  restorePassword = false;

  emailError = '';
  passwordError = '';
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) {}

  setEmailValue(value: any) {
    this.restoreForm!.controls['email'].setValue(value);
    this.emailError = '';
    return value;
  }

  loadLoginPage() {
    this.restorePasswordEvent.emit(false);
  }

  restore() {
    console.log('sent request to api for restoring password');
  }
}
