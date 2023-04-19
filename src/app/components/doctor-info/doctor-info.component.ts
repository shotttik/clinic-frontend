import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/interfaces/Doctor';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css'],
})
export class DoctorInfoComponent implements OnInit {
  doctor: Doctor | undefined;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.apiService.getDoctor(this.doctorId()).subscribe({
      next: (resp: any) => {
        this.doctor = resp;
      },
      error: (err) => {},
    });
  }

  doctorId() {
    const routeParams = this.route.snapshot.paramMap;
    return Number(routeParams.get('doctorId'));
  }
  getImagePath(path: string | null) {
    if (path == null) {
      return;
    }
    return this.apiService.generateBackPath(path);
  }
}
