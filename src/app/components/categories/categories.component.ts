import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryWithDoctor } from 'src/app/interfaces/Category';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @Output() categoryIdChanged = new EventEmitter<number>();
  categories: CategoryWithDoctor[] = [];

  constructor(private apiService: ApiService, private router: Router) {}
  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    this.apiService.getCategories(true).subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      error: (err) => {
        err;
      },
    });
  }
  goDetailPage(id: number) {
    this.router.navigate([`/category/${id}`]);
    this.categoryIdChanged.emit(id);
  }
  IsCurrentPage(id: number): boolean {
    return this.router.url == `/category/${id}`;
  }
}
