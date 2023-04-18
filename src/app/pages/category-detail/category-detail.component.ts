import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Doctor } from 'src/app/interfaces/Doctor';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent implements OnInit {
  doctors: Doctor[] = [];
  categoryId: number;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId'));
  }
  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.apiService.getDoctorsByCategory(this.categoryId).subscribe({
      next: (response: any) => {
        this.doctors = response;
      },
      error: (err) => {
        if (err.status == 404) {
          this.messageService.add({
            severity: 'info',
            summary: 'ინფორმაცია!',
            detail: 'ექიმები ვერ მოიძებნა!',
          });
          this.doctors = [];
        }
      },
    });
  }
  setCategoryId(value: any) {
    if (this.categoryId == value) {
      return;
    }
    this.categoryId = value;
    this.getDoctors();
  }
}
