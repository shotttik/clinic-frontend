import { Component, OnInit } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { Reservation } from 'src/app/interfaces/Reservation';
import { User } from 'src/app/interfaces/User';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  reservations: Reservation[] = [];
  calendarEvents: EventInput[] = [];
  event!: EventInput;
  private readonly user: User;
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {
    this.user = this.authService.getUserData();
  }

  ngOnInit(): void {
    this.getReservations();
    console.log(this.user);
  }

  getReservations() {
    if (this.user.Role == 'ექიმი') {
      this.apiService.getDoctorReservations(this.user.Id).subscribe({
        next: (response: any) => {
          this.reservations = response;

          this.reservations.map((r) => {
            this.event = {
              id: r.id.toString(),
              title: r.title,
              start: r.startDate,
              end: r.endDate,
            };
            if (r.doctorId == this.user.Id) this.event.className = 'myEvent';
            if (r.userId == null) this.event.classNames = 'restDays';
            this.event.className;
            this.calendarEvents.push(this.event);
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.apiService.getUserReservations(this.user.Id).subscribe({
        next: (response: any) => {
          this.reservations = response;

          this.reservations.map((r) => {
            this.event = {
              id: r.id.toString(),
              title: r.title,
              start: r.startDate,
              end: r.endDate,
            };
            if (r.userId == this.user.Id) this.event.className = 'myEvent';
            this.event.className;
            this.calendarEvents.push(this.event);
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
