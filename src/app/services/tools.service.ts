import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor() {}

  numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
