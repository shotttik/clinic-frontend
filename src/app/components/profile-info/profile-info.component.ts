import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class ProfileInfoComponent implements OnInit {
  user: User | undefined;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.user = this.getUserData();
  }
  getUserData() {
    return this.authService.decodeToken();
  }
}
