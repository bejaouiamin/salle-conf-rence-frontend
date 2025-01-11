import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { SalleListComponent } from './salle-list/salle-list.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EquipmentComponent } from './equipment/equipment.component';
import { HeaderComponent } from './header/header.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BlogComponent } from './blog/blog.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FooterComponent } from './footer/footer.component';
import { SalleManagementComponent } from './salle-management/salle-management.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import { AdminReminderComponent } from './admin-reminder/admin-reminder.component';

@NgModule({
  declarations: [
    AppComponent,
    SalleListComponent,
    ReservationComponent,  
    AdminDashboardComponent,
    LoginRegisterComponent,
    HomeComponent,
    EquipmentComponent,
    HeaderComponent,
    BookingFormComponent,
    BlogComponent,
    GalleryComponent,
    FooterComponent,
    SalleManagementComponent,
    UserDashboardComponent,
    UserReservationsComponent,
    AdminReminderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FullCalendarModule
    
  ],
  providers: [
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
