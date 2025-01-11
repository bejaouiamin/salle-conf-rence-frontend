import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getReservations().subscribe((data) => {
      this.reservations = data;

      // Dynamically populate calendar events from reservations
      const events = this.reservations.map((reservation: any) => ({
        title: `Réservation - ${reservation.salle.nom} `,
        start: reservation.start_time,
        end: reservation.end_time,
      }));


    });
  }
  formatDateTime(date: string): string {
    return formatDate(date, 'dd MMM yyyy HH:mm', 'en-US');
  }

  getStatusColor(startTime: string): string {
    const now = new Date();
    const start = new Date(startTime);
    if (start < now) {
      return 'bg-green-100 text-green-800'; // En cours/Passée
    }
    return 'bg-blue-100 text-blue-800'; // À venir
  }

  getStatusText(startTime: string): string {
    const now = new Date();
    const start = new Date(startTime);
    return start < now ? 'En cours' : 'À venir';
  }
  deleteReservation(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Cette action ne peut pas être annulée!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService.deleteReservation(id).subscribe(
          () => {
            Swal.fire(
              'Supprimé!',
              'La réservation a été supprimée.',
              'success'
            );
            this.loadReservations(); // Reload the reservations
          },
          (error) => {
            Swal.fire(
              'Erreur!',
              'Une erreur est survenue lors de la suppression.',
              'error'
            );
            console.error('Error deleting reservation:', error);
          }
        );
      }
    });
  }
}