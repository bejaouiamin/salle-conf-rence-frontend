import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReservationService } from 'src/app/services/reservation.service';
import { SalleService } from 'src/app/services/salle.service';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  @ViewChild('calendar')
  calendar!: FullCalendarModule;

  calendarOptions: any;
  
  salles: any[] = [];
  reservations: any[] = [];
  reservationData = {
    salle_id: '',
    start_time: '',
    end_time: '',
    preferences: '',
    resources: '',
  };

  constructor(
    private salleService: SalleService,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: [
        {
          title: 'Réunion',
          start: '2024-12-10T10:00:00',
          end: '2024-12-10T12:00:00',
        },
      ],
    };
    this.loadSalles();
    this.loadReservations();
  }

  loadSalles() {
    this.salleService.getAllSalles().subscribe((data) => {
      this.salles = data;
    });
  }

  loadReservations() {
    this.reservationService.getReservations().subscribe((data) => {
      this.reservations = data;
    });
  }

  makeReservation() {
    this.reservationService.createReservation(this.reservationData).subscribe((data) => {
      this.loadReservations();  // Reload reservations after a successful reservation
      alert('Réservation créée');
    });
  }

}
