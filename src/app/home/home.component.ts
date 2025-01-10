import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ReservationService } from '../services/reservation.service';
import { SalleService } from '../services/salle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  salles: any[] = [];
  reservations: any[] = [];
  reservationData = {
    salle_id: '',
    user_id: '',
    start_time: '',
    end_time: '',
    preferences: '',
    resources: '',
    email: ''
  };
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    events: [],
    height: 'auto',
    themeSystem: 'standard',
    eventColor: '#9333EA', // Purple color to match theme
    eventDisplay: 'block',
    dayMaxEvents: true,
  };
  constructor(private reservationService: ReservationService,private salleService: SalleService) {}

  ngOnInit() {
    this.loadReservations();
    this.loadSalles();
    this.loadUsers();
  }
  loadSalles() {
    this.salleService.getAllSalles().subscribe((data) => {
      this.salles = data;
    });
  }

  loadUsers() {
    this.reservationService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  loadReservations() {
    this.reservationService.getReservations().subscribe((data) => {
      const events = data.map((reservation: any) => ({
        title: `${reservation.salle.nom} - ${reservation.email}`,
        start: reservation.start_time,
        end: reservation.end_time,
        backgroundColor: '#9333EA',
        borderColor: '#7C3AED'
      }));
      this.calendarOptions.events = events;
    });
  }

 

}
