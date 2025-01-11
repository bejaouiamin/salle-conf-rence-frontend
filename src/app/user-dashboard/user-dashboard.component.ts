import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})

export class UserDashboardComponent implements OnInit {
  userName: string = '';
  isUser: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    
    this.isUser = this.authService.isUser();
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        Swal.fire('Déconnexion', 'Vous avez été déconnecté.', 'success');
        this.router.navigate(['/login']);
      },
      (error) => {
        Swal.fire('Erreur', 'Une erreur est survenue lors de la déconnexion.', 'error');
      }
    );
  }
}
