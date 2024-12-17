import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  // Login method
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  // Registration method
  register(userData: { name: string; email: string; password: string; password_confirmation: string; role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Logout method
  logout(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  // Store user token
  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  // Get user token
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Remove user token
  removeToken(): void {
    sessionStorage.removeItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
