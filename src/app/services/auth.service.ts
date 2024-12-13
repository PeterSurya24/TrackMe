import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth/login';  // URL backend
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.apiUrl, { email, password }).subscribe(
      (response) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', token);
          this.currentUserSubject.next(response.user);
        }
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }
}
