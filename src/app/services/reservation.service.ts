import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8000/api/reservation';
  private apiUrl1 = 'http://localhost:8000/api/reservations';
  private apiUrl3 = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  // src/app/services/reservation.service.ts
  createReservation(data: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl, data, { headers }).pipe(
      catchError((error) => {
        alert('Erreur: ' + error.error.message);
        throw error;
      })
    );
  }
  getReservationsByUserId(userId: number): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return throwError(() => new Error('No authentication token found'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl3}/reservations/user/${userId}`, { headers }).pipe(
      tap(data => console.log('Reservations data:', data)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error.message || error.statusText;
    }

    return throwError(() => errorMessage);
  }


  sendReminder(reservationId: number): Observable<any> {
    return this.http.post(`${this.apiUrl1}/${reservationId}/send-reminder`, {});
  }

  getReservations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getAllReservations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateReservation(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl1}/${id}`, data);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl1}/${id}`);
  }

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:8000/api/users');
  }

}
