import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { WaitDialogComponent } from '../elements/wait-dialog/wait-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor(private dialog: MatDialog) {}

  numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  openWaitDialog() {
    return this.dialog.open(WaitDialogComponent, {
      disableClose: true,
      panelClass: 'custom-dialog-container',
    });
  }

  closeWaitDialog(): void {
    this.dialog;
  }
}
