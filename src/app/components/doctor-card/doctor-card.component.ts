import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Doctor } from 'src/app/interfaces/Doctor';
import { User } from 'src/app/interfaces/User';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css'],
})
export class DoctorCardComponent implements OnInit {
  @Input() doctor: Doctor | any;
  private readonly user: User | undefined;
  constructor(
    private toolService: ToolsService,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    public messageService: MessageService
  ) {
    this.user = this.authService.getUserData();
  }
  ngOnInit(): void {}

  spaceInNumbers(number: number) {
    return this.toolService.numberWithSpaces(number);
  }

  getImagePath(path: string) {
    return this.apiService.generateBackPath(path);
  }

  goDetailPage() {
    if (this.user?.Id == this.doctor.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'შეცდომა!',
        detail: 'შესვლა აკრძალულია!',
      });
    } else {
      this.router.navigate([
        `/category/${this.doctor.category.id}/doctor/${this.doctor.id}`,
      ]);
    }
  }
}
