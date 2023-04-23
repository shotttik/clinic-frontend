import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { RoleGuard } from './services/role.guard';
import { LoggedInGuardGuard } from './services/logged-in-guard.guard';
import { AuthGuard } from './services/auth.guard';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [LoggedInGuardGuard],
  },
  {
    path: 'category/:categoryId/doctor/:doctorId',
    component: ReservationComponent,
  },
  { path: 'category/:categoryId', component: CategoryDetailComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'doctors', component: DoctorsComponent },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [RoleGuard],
    data: { Role: 'Admin' },
  },
  {
    path: 'admin/categories',
    component: AdminPanelComponent,
    canActivate: [RoleGuard],
    data: { Role: 'Admin' },
  },
  {
    path: 'admin/register/:registerType',
    component: AdminPanelComponent,
    canActivate: [RoleGuard],
    data: { Role: 'Admin' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
