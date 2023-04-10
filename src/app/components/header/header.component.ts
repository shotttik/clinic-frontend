import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { AuthorizationComponent } from 'src/app/pages/authorization/authorization.component';
import { ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authDialogOpened = false;
  dialogRef: MatDialogRef<AuthorizationComponent> | undefined;
  navItems = [
    { title: 'ექიმები', url: '/doctors' },
    { title: 'კლინიკები', url: '' },
    { title: 'ანოტაციები', url: '' },
    { title: 'აქციები', url: '' },
    { title: 'სერვისები', url: '' },
    { title: 'მედიკამენტები', url: '' },
    { title: 'კონტაქტი', url: '' },
  ];
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {}

  openDialog() {
    this.authDialogOpened = true;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false; //cannot close if user click outside the dialog
    dialogConfig.autoFocus = true;
    this.dialogRef = this.dialog.open(AuthorizationComponent, dialogConfig);
    this.dialogRef
      .afterClosed()
      .subscribe((data) => (this.authDialogOpened = false));
  }

  IsCurrentPage(navItemUrl: string): boolean {
    return this.router.url == navItemUrl;
  }

  changePage(url: string) {
    this.router.navigate([url]);
  }

  closeDialog() {
    this.dialogRef!.close();
  }

  IsAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getUserEmail() {
    return this.authService.decodeToken().Email;
  }
}
