import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() value = '';
  @Input() height = '';
  @Input() width = '';
  @Input() borderRadius = '';
  @Input() border = '';
  @Input() color = '';
  @Input() background = '';
  @Input() iconRight = '';
  @Input() iconLeft = '';
  @Input() iconTopPos = '';
  @Input() iconLeftPos = '';
  constructor() {}

  ngOnInit(): void {}
}
