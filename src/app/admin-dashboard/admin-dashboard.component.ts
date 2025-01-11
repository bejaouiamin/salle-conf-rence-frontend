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
  selectedReservation: any = {};
  isUpdateModalOpen: boolean = false;
  uniqueRooms: string[] = [];
  activeTab: 'reservations' | 'users' = 'reservations';

  constructor(
    private reservationService: ReservationService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadReservations();
    this.loadUsers();
  }

  loadReservations() {
    this.reservationService.getReservations().subscribe(data => {
      this.reservations = data;
      this.uniqueRooms = Array.from(new Set(this.reservations.map(r => r.salle?.nom || '')));
    });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  promoteToAdmin(userId: number) {
    this.userService.updateUserRole(userId, 'admin').subscribe(() => {
      Swal.fire('Success', 'User role updated to Admin.', 'success');
      this.loadUsers(); // Refresh user list
    });
  }

  filterReservationsByRoom(event: Event) {
    const selectedRoom = (event.target as HTMLSelectElement).value;
    if (selectedRoom === '') {
      this.loadReservations(); // Reset to all reservations
    } else {
      this.reservations = this.reservations.filter(res => res.salle?.nom === selectedRoom);
    }
  }

  checkReservationConflict(newReservation: any): boolean {
    return this.reservations.some(
      res =>
        res.salle?.nom === newReservation.salle?.nom &&
        ((newReservation.start_time >= res.start_time && newReservation.start_time < res.end_time) ||
          (newReservation.end_time > res.start_time && newReservation.end_time <= res.end_time))
    );
  }

  updateReservation1(id: number, data: any) {
    this.reservationService.updateReservation(id, data).subscribe(
      () => {
        Swal.fire('Updated!', 'Reservation has been updated.', 'success');
        this.loadReservations(); // Refresh the reservation list
      },
      (error) => {
        Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour.', 'error');
      }
    );
  }

  openUpdateModal(reservation: any) {
    this.selectedReservation = { ...reservation }; // Copy reservation data to avoid direct modification
    this.isUpdateModalOpen = true;
  }

  closeUpdateModal() {
    this.isUpdateModalOpen = false;
  }

  onSubmitUpdate() {
    this.updateReservation1(this.selectedReservation.id, this.selectedReservation);
    this.closeUpdateModal();
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
