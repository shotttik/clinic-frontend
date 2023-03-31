import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthorizationComponent } from 'src/app/pages/authorization/authorization.component';
import { ElementRef, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authDialogOpened = false;

  navItems = [
    'ექიმები',
    'კლინიკები',
    'ანოტაციები',
    'აქციები',
    'სერვისები',
    'მედიკამენტები',
    'კონტაქტი',
  ];
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  openDialog() {
    this.authDialogOpened = true;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false; //cannot close if user click outside the dialog
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AuthorizationComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((data) => (this.authDialogOpened = false));
  }
}
