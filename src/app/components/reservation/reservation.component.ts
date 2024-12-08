import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReservationService } from 'src/app/services/reservation.service';
import { SalleService } from 'src/app/services/salle.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import Swal from 'sweetalert2';

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
    email: ''  // Add email field to reservation data
  };

  constructor(
    private salleService: SalleService,
    private reservationService: ReservationService
  ) { }

  ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: []  // Initialize with an empty array
    };
    this.loadSalles();
    this.loadReservations();
  }

  loadSalles() {
    this.salleService.getAllSalles().subscribe((data) => {
      this.salles = data;
    });
  }

  // src/app/components/reservation/reservation.component.ts
  loadReservations() {
    this.reservationService.getReservations().subscribe((data) => {
      this.reservations = data;

      // Dynamically populate calendar events from reservations
      const events = this.reservations.map((reservation: any) => ({
        title: `Réservation - ${reservation.salle.nom}`,
        start: reservation.start_time,
        end: reservation.end_time,
      }));

      // Update calendar events
      this.calendarOptions.events = events;
    });
  }


  makeReservation() {
    this.reservationService.createReservation(this.reservationData).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Réservation réussie!',
          text: 'Un email de confirmation a été envoyé.',
        });
        this.loadReservations();  // Reload reservations after successful booking
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: `Erreur lors de la réservation : ${error.error.message}`,
        });
      }
    );
  }


}
