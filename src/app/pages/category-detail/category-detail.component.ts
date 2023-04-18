import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SearchComponent } from 'src/app/components/search/search.component';
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
  @ViewChild(SearchComponent) search: SearchComponent | undefined;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId'));
  }
  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    console.log(this.categoryId);
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
  setDoctorsValue(val: any) {
    this.doctors = val;
    this.router.navigate(['/category/0']);
    this.categoryId = 0;
  }
}
