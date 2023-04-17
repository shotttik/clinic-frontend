import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/interfaces/Category';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Output() selectValueEvent = new EventEmitter<number>();
  @Input() placeholder = '';
  @Input() error = '';
  @Input() options: Category[] = [];

  selectedOption: number = 0;
  valueChanged(v: number) {
    this.selectValueEvent.emit(v);
  }
}
