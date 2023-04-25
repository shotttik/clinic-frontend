import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventInput } from '@fullcalendar/core';
import { Reservation } from 'src/app/interfaces/Reservation';
import { User } from 'src/app/interfaces/User';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  reservations: Reservation[] = [];
  calendarEvents: EventInput[] = [];
  event!: EventInput;
  private readonly user: User | undefined;
  doctorId: number;
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.user = this.authService.getUserData();
    this.doctorId = this.getDoctorId();
  }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.apiService.getDoctorReservations(this.doctorId).subscribe({
      next: (response: any) => {
        this.reservations = response;
        // getting calendar events data from reservations

        this.reservations.map((r) => {
          this.event = {
            id: r.id.toString(),
            title: r.title,
            start: r.startDate,
            end: r.endDate,
          };
          if (r.userId == this.user?.Id) this.event.className = 'myEvent';
          if (r.userId == null) this.event.className = 'restDays';
          this.event.className;
          this.calendarEvents.push(this.event);
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getDoctorId(): number {
    const routeParams = this.route.snapshot.paramMap;
    return Number(routeParams.get('doctorId'));
  }
}
