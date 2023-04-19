import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/interfaces/Doctor';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css'],
})
export class DoctorCardComponent implements OnInit {
  @Input() doctor: Doctor | any;

  constructor(
    private toolService: ToolsService,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  spaceInNumbers(number: number) {
    return this.toolService.numberWithSpaces(number);
  }

  getImagePath(path: string) {
    return this.apiService.generateBackPath(path);
  }

  goDetailPage() {
    this.router.navigate([
      `/category/${this.doctor.category.id}/doctor/${this.doctor.id}`,
    ]);
  }
}
