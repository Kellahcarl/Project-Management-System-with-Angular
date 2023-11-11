import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectAPIService {
  private baseUrl = 'http://localhost:4000';

  constructor(private userApi: UserApiService) {}

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

      const projects = await response.json();

      // Fetch assigned user details for each project
      const projectsWithUsers = await Promise.all(
        projects.map(async (project: any) => {
          if (project.assigned_user_id) {
            try {
              const userResponse = await this.userApi.getUserById(
                project.assigned_user_id
              );
              project.assigned_user_name = userResponse.username;
            } catch (userError) {
              console.error('Error fetching user:', userError);
            }
          }
          return project;
        })
      );

      return projectsWithUsers;
    } catch (error) {
      console.error(error);
      return [];
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

  async assignUserToProject(project_id: string, user_id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/project/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  async unassignUserFromProject(project_id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/project/unAssign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
  async createProject(token: string, projectData: any) {
    try {
      const response = await fetch(`${this.baseUrl}/project`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Token: ` ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to create a project.');
      }

      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
  async getProjectById(token: string, projectId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/project/${projectId}`, {
        headers: {
          Token: ` ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch project by ID.');
      }

      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
  async deleteProject( projectId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/project/${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the project.');
      }

      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
  async fetchUnassignedUsersForProject(token: string, projectId: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/user/unassigned/${projectId}`,
        {
          method: 'GET',
          headers: {
            Token: ` ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch unassigned users for the project.');
      }

      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
