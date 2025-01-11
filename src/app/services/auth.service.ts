import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private authStateSubject: BehaviorSubject<boolean>;
  public authStateChanged: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.authStateSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    this.authStateChanged = this.authStateSubject.asObservable();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.setToken(response.token);
        this.setUserRole(response.user.role);
        // Store the user object including the ID
        this.setCurrentUser(response.user);
        this.authStateSubject.next(true);
      })
    );
  }

  register(userData: { name: string; email: string; password: string; password_confirmation: string; role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((response: any) => {
        this.setToken(response.token);
        this.setUserRole(response.user.role);
        this.authStateSubject.next(true);
      })
    );
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        this.removeToken();
        this.removeUserRole();
        this.authStateSubject.next(false);
      })
    );
  }

  getUserId(): number | null {
    const currentUser = this.getCurrentUser();
    return currentUser && currentUser.id ? currentUser.id : null;
  }

  // ... (other methods remain the same)

  setCurrentUser(user: any): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
  }

  getCurrentUser(): any {
    try {
      const userStr = localStorage.getItem('currentUser');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing current user:', error);
      return null;
    }
  }
  
  
  private isValidToken(token: string): boolean {
    const parts = token.split('|');
    return parts.length === 2;
  }


  isUser(): boolean {
    return this.getUserRole() === 'user';
  }
  

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  setUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  removeUserRole(): void {
    localStorage.removeItem('userRole');
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}