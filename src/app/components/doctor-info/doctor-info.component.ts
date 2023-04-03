import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css'],
})
export class DoctorInfoComponent implements OnInit {
  doctor = {
    ID: 1,
    firstName: 'გიორგი',
    lastName: 'ხორავა',
    category: 'კარდიოლოგი',
    views: 321050,
    image: 'assets/images/medicImage1.png',
  };
  constructor() {}
  ngOnInit(): void {}
}
