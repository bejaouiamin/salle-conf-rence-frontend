import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit {
  reservations: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadReservations();
  }

  loadReservations(): void {
    this.loading = true;
    this.error = null;
    const userId = this.authService.getUserId();
    
    console.log('Current user ID:', userId);
    console.log('Current user:', this.authService.getCurrentUser());
    
    if (!userId) {
      this.error = 'User ID not available';
      this.loading = false;
      Swal.fire({
        title: 'Error',
        text: 'Unable to load reservations: User ID not found. Please try logging in again.',
        icon: 'error',
        confirmButtonText: 'Go to Login',
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.removeToken();
          this.router.navigate(['/login']);
        }
      });
      return;
    }

    this.reservationService.getReservationsByUserId(userId).subscribe({
      next: (data) => {
        console.log('Received reservations:', data);
        this.reservations = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading reservations:', error);
        this.error = typeof error === 'string' ? error : 'Failed to load reservations';
        this.loading = false;
        Swal.fire('Error', this.error, 'error');
      }
    });
  }
}

