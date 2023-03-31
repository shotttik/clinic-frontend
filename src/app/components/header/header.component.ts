import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthorizationComponent } from 'src/app/pages/authorization/authorization.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
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
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false; //cannot close if user click outside the dialog
    dialogConfig.autoFocus = true;
    this.dialog.open(AuthorizationComponent, dialogConfig);
  }
}
