import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class ProfileInfoComponent implements OnInit {
  medic = false;
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
  constructor() {}
  ngOnInit(): void {}
}
