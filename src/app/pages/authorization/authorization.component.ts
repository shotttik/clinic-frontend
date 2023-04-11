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
export class AuthorizationComponent implements OnInit {
  loginForm: FormGroup | undefined;
  restorePassword = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  loadComponent(event: boolean) {
    this.restorePassword = event;
  }
}
