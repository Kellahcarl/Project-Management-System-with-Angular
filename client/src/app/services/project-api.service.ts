
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectAPIService {
  private baseUrl = 'http://localhost:4000';

  constructor() {}

  async getAssignedProject(token: string) {
    const response = await fetch(`${this.baseUrl}/user/check_user_details`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });

    return response.json();
  }

  async markInProgress(projectId: number) {
    const response = await fetch(
      `${this.baseUrl}/project/inprogress/${projectId}`,
      {
        method: 'GET',
      }
    );

    return response.json();
  }

  async markComplete(projectId: number) {
    const response = await fetch(
      `${this.baseUrl}/project/complete/${projectId}`,
      {
        method: 'GET',
      }
    );

    return response.json();
  }

  async fetchProjects() {
    try {
      const response = await fetch(`${this.baseUrl}/project`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects.');
      }
      // console.log(`${this.baseUrl}/project`);

      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUsers(token: string) {
    try {
      const response = await fetch(`${this.baseUrl}/user`, {
        headers: {
          Token: ` ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users.');
      }
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUnassignedUsers(token: string) {
    try {
      const response = await fetch(`${this.baseUrl}/user/unassigned`, {
        method: 'GET',
        headers: {
          Token: ` ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch unassigned users.');
      }
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async assignUserToProject(
    token: string,
    project_id: string,
    user_id: string
  ) {
    try {
      const response = await fetch(`${this.baseUrl}/project/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Token: ` ${token}`,
        },
        body: JSON.stringify({ project_id, user_id }),
      });

      if (!response.ok) {
        console.log('Failed to assign user to the project.');
        alert('Failed to assign user to the project.');
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async unassignUserFromProject(token: string, project_id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/project/unAssign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Token: ` ${token}`,
        },
        body: JSON.stringify({ project_id }),
      });

      if (!response.ok) {
        alert(
          'Project already in progress or user already unassigned from the project.'
        );
        throw new Error('Failed to unassign user from the project.');
      }

      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
