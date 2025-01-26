import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReservationService } from '../services/reservation.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-reminder',
  templateUrl: './admin-reminder.component.html',
  styleUrls: ['./admin-reminder.component.css']
})

export class AdminReminderComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationService: ReservationService, private authService: AuthService) { }

  ngOnInit(): void {
    // this.loadAllReservations();
    this.loadUserReservations();
  }

  loadUserReservations(): void {
    this.reservationService.getAllReservations().subscribe(
      (data: any[]) => {
        this.reservations = data.filter((reservation: any) => reservation.user?.role === 'user');
        console.log('Filtered Reservations:', this.reservations);
      },
      (error) => {
        console.error('Error fetching reservations:', error);
        Swal.fire('Error', 'Failed to load reservations', 'error');
      }
    );
  }
  // loadAllReservations(): void {
  //   this.reservationService.getAllReservations().subscribe(
  //     (data) => {
  //       this.reservations = data;
  //       console.log('Reservations loaded:', this.reservations);
  //     },
  //     (error) => {
  //       console.error('Error fetching reservations:', error);
  //       Swal.fire('Error', 'Failed to load reservations', 'error');
  //     }
  //   );
  // }

  sendReminder(reservationId: number): void {
    this.reservationService.sendReminder(reservationId).subscribe(
      () => {
        Swal.fire('Success', 'Reminder sent successfully', 'success');
      },
      (error) => {
        console.error('Error sending reminder:', error);
        Swal.fire('Error', 'Failed to send reminder', 'error');
      }
    );
  }
}

