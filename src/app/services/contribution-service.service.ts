import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createContribution(projectData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/projects/payment`, projectData, { withCredentials: true });
  }

  getContributionbyProductAndUser(userId: number, projectId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}/contribution/${projectId}`);
  }
}
