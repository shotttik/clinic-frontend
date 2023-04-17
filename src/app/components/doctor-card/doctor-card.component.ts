import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css'],
})
export class DoctorCardComponent implements OnInit {
  @Input() doctor: any;

  constructor(
    private toolService: ToolsService,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {}

  spaceInNumbers(number: number) {
    return this.toolService.numberWithSpaces(number);
  }

  getImagePath(path: string) {
    return this.apiService.generateBackPath(path);
  }
}
