import { Component } from '@angular/core';

import Swal from "sweetalert2";
import { EquipmentService } from '../services/equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  equipmentList: any[] = [];
  newEquipment = { nom: '', is_available: true, status: 'functional' };

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit() {
    this.loadEquipment();
  }
  loadEquipment() {
    this.equipmentService.getAllEquipment().subscribe(data => {
      this.equipmentList = data;
    });
  }

  addEquipment() {
    this.equipmentService.createEquipment(this.newEquipment).subscribe(() => {
      Swal.fire('Success', 'Equipment added successfully!', 'success');
      this.loadEquipment();
      this.newEquipment = { nom: '', is_available: true, status: 'functional' };
    });
  }

  updateStatus(id: number, status: string, isAvailable: boolean) {
    this.equipmentService.updateEquipmentStatus(id, status, isAvailable).subscribe(() => {
      Swal.fire('Updated', 'Equipment status updated successfully!', 'success');
      this.loadEquipment();
    });
  }
  
  deleteEquipment(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cet équipement ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.equipmentService.deleteEquipment(id).subscribe(() => {
          Swal.fire('Supprimé', 'L\'équipement a été supprimé avec succès.', 'success');
          this.loadEquipment();
        }, (error) => {
          Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression.', 'error');
        });
      }
    });
  }

}
