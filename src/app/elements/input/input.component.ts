import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() for = '';
  @Input() svgName = '';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() infoLabel = '';
  @Input() error = '';
  @Input() type = 'text';
  @Output() inputValueEvent = new EventEmitter<string>();
  value = '';
  constructor() {}

  ngOnInit(): void {}

  valueChanged(v: string) {
    this.inputValueEvent.emit(v);
  }
}
