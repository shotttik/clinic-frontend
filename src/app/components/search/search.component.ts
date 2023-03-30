import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  phoneNumber = '032 2 100 100';
  address = 'იაკობ ნიკოლაძე №10';
  searchByName = '';
  searchBySpec = '';
  constructor() {}
  ngOnInit(): void {}
  setMedSearchByName(value: string) {
    this.searchByName = value;
  }
  setMedSearchBySpec(value: string) {
    this.searchBySpec = value;
  }
}
