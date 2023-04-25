import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class ProfileInfoComponent implements OnInit {
  user!: User;
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    this.user = this.authService.getUserData();
  }

  getImagePath(imagePath: string) {
    return this.apiService.generateBackPath(imagePath);
  }
}
