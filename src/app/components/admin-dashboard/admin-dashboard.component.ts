import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  reservations: any[] = [];
  users: any[] = [];

  constructor(
    private reservationService: ReservationService,
    private userService: UserService,
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.loadReservations();
    this.loadUsers();
  }

  loadReservations() {
    this.reservationService.getReservations().subscribe(data => {
      this.reservations = data;
    });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteReservation(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.reservationService.deleteReservation(id).subscribe(() => {
          Swal.fire('Deleted!', 'Reservation has been deleted.', 'success');
          this.loadReservations();
        });
      }
    });
  }
  
  logout() {
    this.authService.logout().subscribe(
      () => {
        this.authService.removeToken();
        Swal.fire('Déconnexion', 'Vous avez été déconnecté.', 'success');
        this.router.navigate(['/login']);
      },
      (error) => {
        Swal.fire('Erreur', 'Une erreur est survenue lors de la déconnexion.', 'error');
      }
    );
  }


}
