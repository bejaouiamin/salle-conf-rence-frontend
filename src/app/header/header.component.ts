import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navItems = [
    { path: '/home', label: 'Home' },
    { path: '/reservation', label: 'Liste Reservation', roles: ['admin']  },   
    { path: '/equipment', label: 'Equipment' , roles: ['admin'] },
    { path: '/sallemanagement', label: 'Salle' , roles: ['admin'] },
    { path: '/admin', label: 'Admin Dashboard', roles: ['admin'] },
    { path: '/admin-Reminder', label: 'Admin Reminder', roles: ['admin'] },
    { path: '/user-dashboard', label: 'User Dashboard', roles: ['user'] },
    { path: '/user-reservation', label: 'My Reservations', roles: ['user'] },
  ];

  isMobileMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.authStateChanged.subscribe(() => {
      // This will trigger change detection and update the menu
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  hasRole(roles: string[]): boolean {
    const userRole = this.authService.getUserRole();
    return userRole !== null && roles.includes(userRole);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}