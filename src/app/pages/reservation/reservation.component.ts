import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const doctorId = Number(routeParams.get('doctorId'));
    console.log(doctorId);
  }
}
