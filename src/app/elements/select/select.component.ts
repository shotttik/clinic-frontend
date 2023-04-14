import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Output() selectValueEvent = new EventEmitter<string>();
  @Input() placeholder = '';
  @Input() error = '';

  options = [
    { id: 1, category: 'ორთმოლოგი' },
    { id: 2, category: 'ყბაყური' },
  ];
  selectedOption: string = '';
  valueChanged(v: string) {
    this.selectValueEvent.emit(v);
  }
}
