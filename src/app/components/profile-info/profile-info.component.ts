import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class ProfileInfoComponent implements OnInit {
  user = {
    ID: 1,
    status: 'მომხმარებელი',
    firstName: 'სახელი',
    lastName: 'გვარი',
    category: '',
    pid: 24001002040,
    email: 'momkhmarebeli@gmail.com',
    reservations: 2,
    image: 'assets/images/profileImg.png',
  };
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    console.log(this.getUserData());
  }
  getUserData() {
    return this.authService.decodeToken();
  }
}
