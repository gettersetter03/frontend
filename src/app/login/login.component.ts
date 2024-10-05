import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  // Used to display error messages in the form if the login fails (e.g., wrong credentials).
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.authService.storeToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.errorMessage = 'Invalid credentials';
      }
    );
  }

  // This function navigates to the register page
  goToRegister() {
    this.router.navigate(['/register']);  // Navigate to the Register page
  }
}
