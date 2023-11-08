import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private apiUrl = 'http://localhost:4000/user/register';

  constructor() {}

  registerUser(userData: any) {
    return fetch(this.apiUrl, {
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
}
