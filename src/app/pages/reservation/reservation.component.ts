import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements AfterViewInit {
  constructor(private route: ActivatedRoute) {}
  ngAfterViewInit(): void {}
}
