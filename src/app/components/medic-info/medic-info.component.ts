import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medic-info',
  templateUrl: './medic-info.component.html',
  styleUrls: ['./medic-info.component.css'],
})
export class MedicInfoComponent implements OnInit {
  medic = {
    ID: '1',
    firstName: 'გიორგი',
    lastName: 'ხორავა',
    category: 'კარდიოლოგი',
    views: 321050,
    image: 'assets/images/medicImage1.png',
  };
  constructor() {}
  ngOnInit(): void {}
}
