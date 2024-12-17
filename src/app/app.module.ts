import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SalleListComponent } from './components/salle-list/salle-list.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';

@NgModule({
  declarations: [
    AppComponent,
    SalleListComponent,
    ReservationComponent,
    EquipmentComponent,
    AdminDashboardComponent,
    LoginRegisterComponent
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
