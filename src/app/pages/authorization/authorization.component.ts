import {
  AfterContentInit,
  Component,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  providers: [MessageService],
})
export class AuthorizationComponent implements OnInit {
  loginForm: FormGroup | undefined;
  restorePassword = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router,
    public dialogRef: MatDialogRef<AuthorizationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    if (this.data != null && this.data.changePassword == true) {
      this.restorePassword = true;
    }
  }
  loadComponent(event: boolean) {
    this.restorePassword = event;
  }
}
