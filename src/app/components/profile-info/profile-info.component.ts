import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { User } from 'src/app/interfaces/User';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';
import { MessageService } from 'primeng/api';
import { RestorePasswordComponent } from '../restore-password/restore-password.component';
import { AuthorizationComponent } from 'src/app/pages/authorization/authorization.component';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class ProfileInfoComponent implements OnInit {
  user: User | undefined;
  dialogRef: MatDialogRef<AuthorizationComponent> | undefined;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.user = this.authService.getUserData();
  }

  getImagePath(imagePath: string) {
    return this.apiService.generateBackPath(imagePath);
  }

  changePassword() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false; //cannot close if user click outside the dialog
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      changePassword: true,
    };
    this.dialogRef = this.dialog.open(AuthorizationComponent, dialogConfig);
  }
}
