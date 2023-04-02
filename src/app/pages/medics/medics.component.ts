import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css'],
})
export class MedicsComponent implements OnInit {
  medicItems = [
    {
      ID: '1',
      firstName: 'გიორგი',
      lastName: 'ხორავა',
      category: 'კარდიოლოგი',
      views: 321050,
      image: 'assets/images/medicImage1.png',
    },
    {
      ID: '4',
      firstName: 'გიორგი',
      lastName: 'ხორავა',
      category: 'კარდიოლოგი',
      views: 321050,
      image: 'assets/images/medicImage2.png',
    },
    {
      ID: '2',
      firstName: 'გიორგი',
      lastName: 'ხორავა',
      category: 'კარდიოლოგი',
      views: 321050,
      image: 'assets/images/medicImage3.png',
    },
    {
      ID: '3',
      firstName: 'გიორგი',
      lastName: 'ხორავა',
      category: 'კარდიოლოგი',
      views: 321050,
      image: 'assets/images/medicImage1.png',
    },
  ];
  constructor() {}
  ngOnInit(): void {}
}
