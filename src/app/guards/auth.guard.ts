import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // CanActivate interface available from the @angular/router 
  // package and extends the canActivate() method which holds 
  // the logic to allow or deny access to the route.
  canActivate(): boolean {
    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      return true; // Allow access if logged in
    }

    // Redirect to login page if not authenticated
    this.router.navigate(['/login']);
    return false;
  }
}
