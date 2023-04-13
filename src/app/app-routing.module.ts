import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { RoleGuard } from './services/role.guard';
import { LoggedInGuardGuard } from './services/logged-in-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [LoggedInGuardGuard],
  },
  { path: 'doctor/:doctorId', component: ReservationComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [RoleGuard],
  },
  { path: 'doctors', component: DoctorsComponent },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [RoleGuard],
    data: { IsAdmin: true },
  },
  {
    path: 'admin/categories',
    component: AdminPanelComponent,
    canActivate: [RoleGuard],
    data: { IsAdmin: true },
  },
  {
    path: 'admin/register/:registerType',
    component: AdminPanelComponent,
    canActivate: [RoleGuard],
    data: { IsAdmin: true },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
