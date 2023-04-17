import { Component, OnInit } from '@angular/core';
import { CategoryWithDoctor } from 'src/app/interfaces/Category';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: CategoryWithDoctor[] = [];

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getCategories(true).subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      error: (err) => {
        err;
      },
    });
  }
}
