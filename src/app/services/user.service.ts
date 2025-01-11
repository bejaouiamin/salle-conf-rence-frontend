import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateUserRole(userId: number, role: string): Observable<any> {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage or another storage method
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(
      `${this.apiUrl}/${userId}/promote`,
      { role },
      { headers }
    );
  }

}
