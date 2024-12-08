import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  private apiUrl = 'http://localhost:8000/api/salles';
  constructor(private http: HttpClient) {}
  getAllSalles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createSalle(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getSalleById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateSalle(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteSalle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
