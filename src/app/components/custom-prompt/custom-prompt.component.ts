import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-prompt',
  templateUrl: './custom-prompt.component.html',
  styleUrls: ['./custom-prompt.component.css'],
})
export class CustomPromptComponent {
  @Output() confirmEvent = new EventEmitter<string>();
  @Output() cancelEvent = new EventEmitter<void>();
  @Input() message = 'მიუთითეთ თქვენი პრობლემა';
  inputText: string = '';

  confirm() {
    this.confirmEvent.emit(this.inputText);
  }

  cancel() {
    this.cancelEvent.emit();
  }
}
