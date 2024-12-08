import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8000/api/reservations';

  constructor(private http: HttpClient) {}

  // src/app/services/reservation.service.ts
    createReservation(data: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, data).pipe(
        catchError((error) => {
          alert('Erreur: ' + error.error.message);
          throw error;
        })
      );
    }


  getReservations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
