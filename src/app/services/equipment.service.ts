import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private apiUrl = 'http://localhost:8000/api/equipment';

  constructor(private http: HttpClient) {}
  getAllEquipment(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createEquipment(equipment: any): Observable<any> {
    return this.http.post(this.apiUrl, equipment);
  }

  updateEquipmentStatus(id: number, status: string, isAvailable: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status, is_available: isAvailable });
  }

  deleteEquipment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
