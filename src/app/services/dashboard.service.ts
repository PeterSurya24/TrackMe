import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:5000/dashboard'; // URL endpoint dashboard

  constructor(private http: HttpClient) { }

  // Fungsi untuk mendapatkan data dashboard
  getDashboardData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
