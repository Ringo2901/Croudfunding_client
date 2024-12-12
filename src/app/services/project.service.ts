import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Project} from '../models/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) {}

  createProject(projectData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, projectData, { withCredentials: true });
  }

  uploadImages(projectId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`http://localhost:3000/api/media/upload/${projectId}`, formData);
  }

  getTopProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/top`);
  }

  getProjects(page: number, limit: number, search?: string, category?: string, type?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) params = params.set('search', search);
    if (category) params = params.set('category', category);
    if (type) params = params.set('type', type);

    return this.http.get<any>(`${this.apiUrl}`, { params });
  }

  getCategories(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/categories`);
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${projectId}`);
  }

  getProjectUpdates(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${projectId}/updates`);
  }

  getProjectComments(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${projectId}/comments`);
  }

  getProjectRewards(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${projectId}/rewards`);
  }

  addProjectReward(projectId: number, reward: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${projectId}/rewards`, reward);
  }

  addProjectComment(projectId: number, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${projectId}/comments`, comment);
  }

  addProjectUpdate(projectId: number, update: { title: string; content: string; created_at: Date; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${projectId}/updates`, update);
  }
}
