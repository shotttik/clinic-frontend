import { Component, Input, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css'],
})
export class DoctorCardComponent implements OnInit {
  @Input() doctor: any;

  constructor(private toolService: ToolsService) {}
  ngOnInit(): void {}

  spaceInNumbers(number: number) {
    return this.toolService.numberWithSpaces(number);
  }
}
