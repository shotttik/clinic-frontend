import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

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
  @Input() disabled = false;
  @Output() inputValueEvent = new EventEmitter<string>();
  @ViewChild('ival') inputElement: any;
  value = '';
  show: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  valueChanged(v: string) {
    this.inputValueEvent.emit(v);
  }
  password() {
    this.show = !this.show;
    this.show
      ? (this.inputElement.nativeElement.type = 'text')
      : (this.inputElement.nativeElement.type = 'password');
  }
}
