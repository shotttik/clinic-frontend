import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/interfaces/Doctor';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  showAll: boolean = false;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getDoctors().subscribe({
      next: (response: any) => {
        this.doctors = response;
      },
      error: (err) => {},
    });
  }

  setDoctorsValue(val: any) {
    this.doctors = val;
  }
}
