import { Component, Input, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-medic-card',
  templateUrl: './medic-card.component.html',
  styleUrls: ['./medic-card.component.css'],
})
export class MedicCardComponent implements OnInit {
  @Input() medicItem: any;

  constructor(private toolService: ToolsService) {}
  ngOnInit(): void {}

  spaceInNumbers(number: number) {
    return this.toolService.numberWithSpaces(number);
  }
}
