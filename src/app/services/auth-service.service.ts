import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly nicknameKey = 'authToken';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private readonly apiUrl = 'http://localhost:3000/api/users';


  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  register(nickname: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { nickname, email, password });
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/status`, { withCredentials: true }).pipe(
      tap((isAuthenticated: boolean) => {
        this.isAuthenticatedSubject.next(isAuthenticated);
      })
    );
  }

  status(): Observable<any>{
    return this.http.get<boolean>(`${this.apiUrl}/status`, { withCredentials: true });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
      })
    );
  }
}
