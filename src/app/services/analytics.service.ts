import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'http://localhost:3000/api/analytics';

  getAnalytics(projectId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${projectId}`);
  }

  getContributions(projectId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${projectId}/contributions`);
  }
}
