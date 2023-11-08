import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userData: { email: string; password: string } = { email: '', password: '' };
  emailError: string = '';
  passwordError: string = '';
  apiMessage: string = '';

  constructor(private router: Router, private userService: UserApiService) {}

  onSubmit() {
    // Clear any previous error messages
    this.emailError = '';
    this.passwordError = '';
    this.apiMessage = '';

    // Validation logic
    if (this.userData.email.trim() === '') {
      this.emailError = 'Email is required';
      return;
    }

    if (this.userData.password.trim() === '') {
      this.passwordError = 'Password is required';
      return;
    }

    // Form data is valid, create the user object
    const userData = {
      email: this.userData.email,
      password: this.userData.password,
    };

    this.userService.loginUser(userData).then(
      (data) => {
        if ('message' in data) {
          this.apiMessage = data.message;
        }
        if ('error' in data) {
          this.apiMessage = data.error;
        }

        // Implement the logic for redirecting to the appropriate page (admin or user)
        if ('token' in data) {
          localStorage.setItem('token', data.token);

          // Example of redirecting to 'user' or 'admin' page based on response:
          // this.router.navigate(data.info.isAdmin ? ['/admin'] : ['/user']);
        }
        this.userService.checkUserDetails().then((data) => {
          if ('info' in data) {
            if (data.info.isAdmin === true) {
              localStorage.setItem('user_email', data.info.email!);
              this.router.navigate(['/admin']);
            } else if (data.info.isAdmin === false) {
              localStorage.setItem('user_email', data.info.email!);
              this.router.navigate(['/user']);
            }
          }
        });
      },
      (error) => {
        console.error(error);
        // Handle error and possibly show an error message
      }
    );
  }
}
