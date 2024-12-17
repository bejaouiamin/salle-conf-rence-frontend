import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  role: string = ''; // Default role

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        Swal.fire('Succès', 'Connexion réussie!', 'success');
        this.router.navigate(['/admin']); // Redirection vers le tableau de bord
      },
      (error) => {
        Swal.fire('Erreur', 'Email ou mot de passe incorrect.', 'error');
      }
    );
  }
  register() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,
      role: this.role
    };

    this.authService.register(userData).subscribe(
      (response) => {
        Swal.fire('Succès', 'Inscription réussie! Connectez-vous pour continuer.', 'success');
        this.router.navigate(['/login']);
      },
      (error) => {
        Swal.fire('Erreur', error.error.message || 'Une erreur est survenue lors de l\'inscription.', 'error');
      }
    );
  }
}
