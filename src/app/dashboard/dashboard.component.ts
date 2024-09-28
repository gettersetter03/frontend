import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);  // Redirect to login if not logged in
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
