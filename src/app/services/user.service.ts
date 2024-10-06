// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // the backend URL
  private apiUrl = 'http://localhost:3000';  

  constructor(private http: HttpClient) { }

  getUsers(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`, {
      params: {
        page: page.toString(),
        limit: limit.toString()
      }
    });
  }
  

  getUserTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/types`);
  }
}
