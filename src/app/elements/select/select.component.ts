import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Output() selectValueEvent = new EventEmitter<number>();
  @Input() placeholder = '';
  @Input() error = '';

  options = [
    { id: 4, category: 'ყბაყური' },
    { id: 5, category: 'სტომატოლოგი' },
  ];
  selectedOption: number = 0;
  valueChanged(v: number) {
    this.selectValueEvent.emit(v);
  }
}
