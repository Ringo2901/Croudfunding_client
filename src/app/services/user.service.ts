import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, { withCredentials: true });
  }

  updateUserInfo(userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile`, userData, { withCredentials: true });
  }

  getUserProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`, { withCredentials: true });
  }
  getUserContributions(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/users/${userId}/contributions`);
  }

}
