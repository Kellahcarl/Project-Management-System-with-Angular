import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userData: { username: string; email: string; password: string } = {
    username: '',
    email: '',
    password: '',
  };
  confirmPassword: string = '';
  usernameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';
  apiMessage: string = '';

  constructor(private router: Router, private apiService: UserApiService) {}

  onSubmit() {
    this.apiMessage = '';
    this.apiService
      .registerUser(this.userData)
      .then((data) => {
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
        console.error(error);
        // Handle fetch error, if any
      });
  }
}
