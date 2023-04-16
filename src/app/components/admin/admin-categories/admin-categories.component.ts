import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/interfaces/Category';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css'],
})
export class AdminCategoriesComponent implements OnInit {
  category_list: Category[] = [];
  constructor(
    private apiService: ApiService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.apiService.getCategories(false).subscribe({
      next: (response: any) => {
        this.category_list = response;
      },
      error: (err) => {
        err;
      },
    });
  }

  onDelete(category: Category) {
    this.apiService.deleteCategory(category.id).subscribe({
      next: (response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'წარმატეუბლი!',
          detail: 'წაიშალა წარმატებით',
        });
        this.category_list = this.category_list.filter(
          (c) => c.id != category.id
        );
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'შეცდომა!',
          detail: err.error,
        });
      },
    });
  }
}
