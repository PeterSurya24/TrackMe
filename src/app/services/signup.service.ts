import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Mendefinisikan interface untuk data pengguna
export interface UserSignup {
  username: string;
  email: string;
  phone: string;
  commuting_method: string;
  energy_sources: string;
  dietary_preference: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private apiUrl = '/api/signup';  // Menggunakan proksi untuk API backend

  constructor(private http: HttpClient) {}

  // Method untuk mengirim data signup ke backend
  submitData(userData: UserSignup): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
