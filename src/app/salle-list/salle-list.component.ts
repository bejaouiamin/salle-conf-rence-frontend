import { Component, OnInit } from '@angular/core';
import { SalleService } from 'src/app/services/salle.service';

@Component({
  selector: 'app-salle-list',
  templateUrl: './salle-list.component.html',
  styleUrls: ['./salle-list.component.css']
})
export class SalleListComponent implements OnInit {
  salles: any[] = [];

  constructor(private salleService: SalleService) { }

  ngOnInit() {
    this.salleService.getAllSalles().subscribe((data) => {
      this.salles = data;
    });
  }

  getEquipementsList(equipements: string): string[] {
    return equipements.split(',').map(item => item.trim());
  }
}
