import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})

export class LoginRegisterComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isRegistering = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
      role: ['user', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('password_confirmation');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }

  login() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };
  
      this.authService.login(credentials).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Connexion réussie!',
            text: 'Bienvenue!',
            confirmButtonColor: '#6366F1'
          });
  
          this.navigateBasedOnRole();
        },
        (error) => {
          console.error('Login Error:', error);
          let errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
  
          if (error.status === 401) {
            errorMessage = 'Email ou mot de passe incorrect.';
          } else if (error.status === 500) {
            errorMessage = 'Erreur interne du serveur.';
          }
  
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: errorMessage,
            confirmButtonColor: '#6366F1'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulaire invalide',
        text: 'Veuillez remplir tous les champs correctement.',
        confirmButtonColor: '#6366F1'
      });
    }
  }
  
  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Inscription réussie!',
            text: 'Vous êtes maintenant connecté.',
            confirmButtonColor: '#6366F1'
          });
          this.navigateBasedOnRole();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: error.error.message || 'Une erreur est survenue lors de l\'inscription.',
            confirmButtonColor: '#6366F1'
          });
        }
      );
    }
  }

  private navigateBasedOnRole() {
    const userRole = this.authService.getUserRole();
    if (userRole === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user-dashboard']);
    }
  }
}
