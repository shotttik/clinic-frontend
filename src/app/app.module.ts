import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { SearchComponent } from './components/search/search.component';
import { InputComponent } from './elements/input/input.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ButtonComponent } from './elements/button/button.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MedicsComponent } from './pages/medics/medics.component';
import { SliderComponent } from './components/slider/slider.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MedicCardComponent } from './components/medic-card/medic-card.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { MedicInfoComponent } from './components/medic-info/medic-info.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfileComponent } from './pages/profile/profile.component';

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
    MedicsComponent,
    SliderComponent,
    CategoriesComponent,
    MedicCardComponent,
    ReservationComponent,
    MedicInfoComponent,
    CalendarComponent,
    ProfileInfoComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
