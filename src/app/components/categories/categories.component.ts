import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories = [
    {
      category: 'ანდროლოგი',
      value: 14,
    },
    {
      category: 'ანესთეზოლოგი',
      value: 61,
    },
    {
      category: 'კოსმეტოლოგი',
      value: 467,
    },
    {
      category: 'ლაბორანტი',
      value: 43,
    },
    {
      category: 'პედიატრი',
      value: 8,
    },
  ];
  constructor() {}
  ngOnInit(): void {}
}
