import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalleService } from '../services/salle.service';
import { ReservationService } from '../services/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  salles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private salleService: SalleService,
    private reservationService: ReservationService
  ) {
    this.bookingForm = this.fb.group({
      salle_id: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      preferences: [''],
      resources: ['']
    });
  }

  ngOnInit() {
    this.loadSalles();
  }

  loadSalles() {
    this.salleService.getAllSalles().subscribe((data) => {
      this.salles = data;
    });
  }

  makeReservation() {
    if (this.bookingForm.valid) {
      this.reservationService.createReservation(this.bookingForm.value).subscribe(
        (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Reservation Successful!',
            text: 'A confirmation email has been sent.',
            confirmButtonColor: '#9333EA'
          });
          this.resetForm();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Reservation error: ${error.error.message}`,
            confirmButtonColor: '#9333EA'
          });
        }
      );
    } else {
      this.validateReservation();
    }
  }

  private validateReservation() {
    const controls = this.bookingForm.controls;
    if (controls['salle_id'].invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please select a room',
        confirmButtonColor: '#9333EA'
      });
    } else if (controls['start_time'].invalid || controls['end_time'].invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please select both start and end times',
        confirmButtonColor: '#9333EA'
      });
    } else if (controls['email'].invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please enter a valid email',
        confirmButtonColor: '#9333EA'
      });
    }
  }

  private resetForm() {
    this.bookingForm.reset({
      salle_id: '',
      start_time: '',
      end_time: '',
      email: '',
      preferences: '',
      resources: ''
    });
  }
}
