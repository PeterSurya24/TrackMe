import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:5000';  // Backend URL

  constructor(private http: HttpClient) {}

  // Register method
  register(customerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/customer`, customerData);
  }

  // Login method
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/customer`, credentials);
  }

  // Save token in local storage
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Remove token from local storage
  removeToken(): void {
    localStorage.removeItem('auth_token');
  }
}
