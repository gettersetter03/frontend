import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (!this.isPasswordStrong(this.password)) {
      this.errorMessage =
        'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.';
      return;
    }
    this.authService.register(this.username, this.password).subscribe(
      (response) => {
        console.log('User registered successfully');
        this.router.navigate(['/login']); // Redirect to login on success
      },
      (error) => {
        // Handle error when username is already registered
        if (error.status === 409) {
          this.errorMessage = 'Username is already registered';
        } else if (error.status === 400) {
          this.errorMessage = 'Username does not exist';
        } else {
          this.errorMessage = 'Failed to register user';
        }
      }
    );
  }

  // Function to validate password strength
  isPasswordStrong(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars
    );
  }

  // This function navigates to the login page
  goToLogin() {
    this.router.navigate(['/login']); // Navigate to the Login page
  }
}
