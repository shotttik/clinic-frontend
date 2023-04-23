import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { SearchComponent } from './components/search/search.component';
import { InputComponent } from './elements/input/input.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ButtonComponent } from './elements/button/button.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { SliderComponent } from './components/slider/slider.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DoctorCardComponent } from './components/doctor-card/doctor-card.component';
import { DoctorInfoComponent } from './components/doctor-info/doctor-info.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { DoctorEditComponent } from './components/doctor-edit/doctor-edit.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { ToastModule } from 'primeng/toast';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { LoginComponent } from './components/login/login.component';
import { InterceptorService } from './services/interceptor.service';
import { WaitDialogComponent } from './elements/wait-dialog/wait-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { SelectComponent } from './elements/select/select.component';
import { FileUploadComponent } from './elements/file-upload/file-upload.component';
import { TableModule } from 'primeng/table';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CustomPromptComponent } from './components/dialog-popup/custom-prompt/custom-prompt.component';
import { ConfirmationDialogComponent } from './components/dialog-popup/confirmation-dialog/confirmation-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SvgIconComponent,
    SearchComponent,
    InputComponent,
    RegistrationComponent,
    ButtonComponent,
    AuthorizationComponent,
    SliderComponent,
    CategoriesComponent,
    ReservationComponent,
    CalendarComponent,
    ProfileInfoComponent,
    ProfileComponent,
    DoctorCardComponent,
    DoctorInfoComponent,
    DoctorsComponent,
    DoctorEditComponent,
    AdminPanelComponent,
    RestorePasswordComponent,
    LoginComponent,
    WaitDialogComponent,
    AdminCategoriesComponent,
    AdminRegisterComponent,
    SelectComponent,
    FileUploadComponent,
    CategoryDetailComponent,
    CustomPromptComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    //calendar
    FullCalendarModule,
    //primeng
    ToastModule,
    TableModule,
    //angularMat
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
