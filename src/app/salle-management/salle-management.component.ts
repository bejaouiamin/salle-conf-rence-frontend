import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalleService } from '../services/salle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salle-management',
  templateUrl: './salle-management.component.html',
  styleUrls: ['./salle-management.component.css']
})
export class SalleManagementComponent implements OnInit {
  salles: any[] = [];
  salleForm: FormGroup;
  isEditing = false;
  editingSalleId: number | null = null;

  constructor(
    private salleService: SalleService,
    private fb: FormBuilder
  ) {
    this.salleForm = this.fb.group({
      nom: ['', Validators.required],
      capacite: ['', [Validators.required, Validators.min(1)]],
      localisation: ['', Validators.required],
      equipements: ['']
    });
  }

  ngOnInit(): void {
    this.loadSalles();
  }
  loadSalles(): void {
    this.salleService.getAllSalles().subscribe(
      (data) => {
        this.salles = data;
      },
      (error) => {
        console.error('Error loading salles:', error);
        Swal.fire('Error', 'Failed to load salles', 'error');
      }
    );
  }

  onSubmit(): void {
    if (this.salleForm.valid) {
      if (this.isEditing) {
        this.updateSalle();
      } else {
        this.createSalle();
      }
    }
  }

  createSalle(): void {
    this.salleService.createSalle(this.salleForm.value).subscribe(
      (response) => {
        Swal.fire('Success', 'Salle created successfully', 'success');
        this.loadSalles();
        this.salleForm.reset();
      },
      (error) => {
        console.error('Error creating salle:', error);
        Swal.fire('Error', 'Failed to create salle', 'error');
      }
    );
  }

  updateSalle(): void {
    if (this.editingSalleId) {
      this.salleService.updateSalle(this.editingSalleId, this.salleForm.value).subscribe(
        (response) => {
          Swal.fire('Success', 'Salle updated successfully', 'success');
          this.loadSalles();
          this.cancelEdit();
        },
        (error) => {
          console.error('Error updating salle:', error);
          Swal.fire('Error', 'Failed to update salle', 'error');
        }
      );
    }
  }

  deleteSalle(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this salle!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.salleService.deleteSalle(id).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'Salle has been deleted.', 'success');
            this.loadSalles();
          },
          (error) => {
            console.error('Error deleting salle:', error);
            Swal.fire('Error', 'Failed to delete salle', 'error');
          }
        );
      }
    });
  }

  editSalle(salle: any): void {
    this.isEditing = true;
    this.editingSalleId = salle.id;
    this.salleForm.patchValue(salle);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingSalleId = null;
    this.salleForm.reset();
  }
}