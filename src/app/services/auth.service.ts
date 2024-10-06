import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL of backend
  private apiUrl = 'http://localhost:3000';  

  constructor(private http: HttpClient) { }

  // Login method
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  // Register method
  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password });
  }

  // Store the JWT token
  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  // Retrieve the JWT token
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Logout (remove token)
  logout() {
    sessionStorage.removeItem('token');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    //!! is used to convert the result of getToken() into a boolean. 
    //If the token exists, the method returns true (logged in), otherwise
    // it returns false (not logged in).
    return !!this.getToken();
  }
}
