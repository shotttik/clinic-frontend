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
  private readonly user: User;
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {
    this.user = this.authService.getUserData();
  }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.apiService.getUserReservations(this.user.Id).subscribe({
      next: (response: any) => {
        this.reservations = response;
        // getting calendar events data from reservations
        this.reservations.map((r) => {
          this.calendarEvents.push({
            id: r.id.toString(),
            title: r.title,
            start: r.startDate,
            end: r.endDate,
          });
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
