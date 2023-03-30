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
  @Output() inputValueEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  valueChanged(v: string) {
    this.inputValueEvent.emit(v);
  }
}
