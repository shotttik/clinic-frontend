import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css'],
})
export class DoctorEditComponent implements OnInit {
  doctor = {
    ID: 1,
    firstName: 'გიორგი',
    lastName: 'ხორავა',
    email: 'asdasemail@gmail.com',
    status: 'ექიმი',
    category: 'კარდიოლოგი',
    views: 321050,
    reservations: 20,
    pid: 24001002030,
    image: 'assets/images/medicImage1.png',
  };
  constructor() {}
  ngOnInit(): void {}
}
