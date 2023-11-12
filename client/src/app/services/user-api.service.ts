import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private apiUrl = 'http://localhost:4000/user';

  constructor() {}

  async registerUser(userData: any): Promise<any> {
    try {
      const url = `${this.apiUrl}/register`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if ('message' in data) {
        return data;
      } else if ('error' in data) {
        throw data;
      }
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  async loginUser(userData: { email: string; password: string }): Promise<any> {
    try {
      const url = `${this.apiUrl}/login`;
      const options: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      };

      const response = await fetch(url, options);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  async checkUserDetails(): Promise<any> {
    try {
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

      const response = await fetch(url, options);
      const data = await response.json();

      // console.log(`log from service: ${data}`);
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  async updateUser(userData: any): Promise<any> {
    try {
      const url = `${this.apiUrl}/update`;
      const token = localStorage.getItem('token') as string;
      const options: RequestInit = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(userData),
      };

      const response = await fetch(url, options);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<any> {
    try {
      const url = `${this.apiUrl}/delete/${userId}`;
      const token = localStorage.getItem('token') as string;
      const options: RequestInit = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<any> {
    try {
      const url = `${this.apiUrl}/all`;
      const token = localStorage.getItem('token') as string;
      const options: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  async getUserById(userId: string): Promise<any> {
    try {
      const url = `${this.apiUrl}/get/${userId}`;
      const token = localStorage.getItem('token') as string;
      if (!token) {
        console.error('Token not found.');
        return [];
      }
      const options: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  async getAssignedUsers(): Promise<any> {
    try {
      const url = `${this.apiUrl}/assigned`;
      const token = localStorage.getItem('token') as string;
      const options: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }
}
