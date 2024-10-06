import { OnInit } from '@angular/core'; // Add OnInit
import { AuthService } from '../services/auth.service'; // Keep AuthService
import { Router } from '@angular/router'; // Keep Router
import { UserService } from '../services/user.service'; // Import the service
import { User } from '../models/user.model';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Implement OnInit
  username = ''; // Already here
  users: any[] = []; // Array to store users
  today = new Date(); // For calculating active status

  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;

  // For the Pie Chart
  userTypeCounts = { s: 0, m: 0, x: 0 }; // To count user types

  public chartOptions: any; // Chart options for the ApexChart

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    // Fetch user types and update the chart when the component loads
    this.userService.getUserTypes().subscribe((userTypeCounts) => {
      // Update the pie chart based on the userTypeCounts from backend
      this.chartOptions = {
        series: [userTypeCounts.s, userTypeCounts.m, userTypeCounts.x], // Data for S, M, X types
        chart: {
          type: 'pie',
        },
        labels: ['S Type', 'M Type', 'X Type'], // Labels for the pie chart
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      };
    });

    // this.userService.getUsers().subscribe((users) => {
    //   this.users = users; // Populate the users list
    // });
  }

  loadUsers() {
    this.userService
      .getUsers(this.currentPage, this.limit)
      .subscribe((response) => {
        this.users = response.users;
        this.totalPages = response.totalPages;
      });
  }

  // Navigate to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  // Navigate to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  categorizeUsers(users: User[]): void {
    // Initialize counts for each type
    this.userTypeCounts = { s: 0, m: 0, x: 0 };

    // Loop through the users array
    users.forEach((user: User) => {
      this.userTypeCounts[user.type] += 1; // Increment based on user type
    });
  }

  // Check if a user is active based on their last logon time (within the last 30 days)
  isActive(lastLogonTime: string): boolean {
    const logonDate = new Date(lastLogonTime);
    const diffInDays = Math.floor(
      (this.today.getTime() - logonDate.getTime()) / (1000 * 3600 * 24)
    );
    return diffInDays <= 30;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
