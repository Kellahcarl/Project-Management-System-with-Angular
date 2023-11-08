import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private apiUrl = 'http://localhost:4000/user';

  constructor() {}

  registerUser(userData: any) {
    return fetch(this.apiUrl + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Type assertion
        if ('message' in data) {
          return data;
        } else if ('error' in data) {
          throw data;
        }
      });
  }
  loginUser(userData: { email: string; password: string }) {
    const url = `${this.apiUrl}/login`;
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    return fetch(url, options)
      .then((response) => response.json())
      .catch((error) => {
        console.error('API request error:', error);
        throw error;
      })
      .then((data) => {
        // Handle any other processing if needed
        return data;
      });
  }

  checkUserDetails() {
    const token = localStorage.getItem('token') as string;

    const url = `${this.apiUrl}/check_user_details`;
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        token: token,
      },
    };

    return fetch(url, options)
      .then((response) => response.json())
      .catch((error) => {
        console.error('API request error:', error);
        throw error;
      })
      .then((data) => {
        console.log(`log from service : ${data}`);

        return data;
      });
  }
}
