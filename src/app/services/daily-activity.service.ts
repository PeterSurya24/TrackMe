// File: src/app/services/daily-activity.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DailyActivity {
  transportationModels: string;
  energyUsage: string;
  meals: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class DailyActivityService {
  private apiUrl = 'http://localhost:5000/daily-activity'; // Pastikan URL backend benar

  constructor(private http: HttpClient) {}

  addActivity(activity: DailyActivity): Observable<any> {
    return this.http.post<any>(this.apiUrl, activity);
  }
}
