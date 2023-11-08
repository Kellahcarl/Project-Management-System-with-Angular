import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { user } from '../../../../backend/src/types/userInterfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userData: {
    username: string;
    email: string;
    password: string;
  } = {
    username: '',
    email: '',
    password: '',
  };
  pwd: {
    confirmPassword: string;
  } = {
    confirmPassword: '',
  };

  // confirmPassword: string = '';
  usernameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';
  apiMessage: string = '';

  constructor(private router: Router, private apiService: UserApiService) {}

  onSubmit() {
    this.apiMessage = '';

    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';

    if (this.userData.username.trim() === '') {
      this.usernameError = 'Username is required';
      return;
    }

    if (this.userData.email.trim() === '') {
      this.emailError = 'Email is required';
      return;
    }

    if (this.userData.password.trim() === '') {
      this.passwordError = 'Password is required';
      return;
    }
    if (this.pwd.confirmPassword.trim() === '') {
      this.confirmPasswordError = 'Password is required';
      return;
    }

    // console.log(this.userData.password, this.pwd.confirmPassword);

    if (this.userData.password !== this.pwd.confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match';
      return;
    }

    const userData = {
      username: this.userData.username,
      email: this.userData.email,
      password: this.userData.password,
    };

    // console.log(userData);

    this.apiService
      .registerUser(this.userData)
      .then((data) => {
        // console.log(data);

        if ('message' in data) {
          this.apiMessage = data.message;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else if ('error' in data) {
          this.apiMessage = data.error;
        }
      })
      .catch((error) => {
        console.log(error);
        this.apiMessage = error.error;
      });
  }
}
