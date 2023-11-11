// admin.component.ts
import { Component } from '@angular/core';

import { ProjectAPIService } from '../services/project-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  projects: any[] = [];
  users: any[] = [];
  unassignedUsers: any[] = [];
  user: any;

  constructor(private apiService: ProjectAPIService, private router: Router) {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
    }
  }

  isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  ngOnInit(): void {
    this.fetchProjects();
    this.fetchUsers();
    this.fetchUnassignedUsers();
  }

  getStatusColorClass(status: string): string {
    switch (status) {
      case 'unassigned':
        return 'bg-gray-300 rounded';
      case 'assigned':
        return 'bg-yellow-500 rounded';
      case 'inProgress':
        return 'bg-blue-500 rounded';
      case 'completed':
        return 'bg-green-500 rounded';
      default:
        return 'bg-gray-300 rounded';
    }
  }

  async fetchProjects() {
    try {
      this.projects = await this.apiService.fetchProjects();
      // console.log(this.projects);
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUsers() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found.');
      return;
    }

    try {
      this.users = await this.apiService.fetchUsers(token);
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUnassignedUsers() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found.');
      return;
    }

    try {
      this.unassignedUsers = await this.apiService.fetchUnassignedUsers(token);
      // console.log(this.unassignedUsers);
    } catch (error) {
      console.error(error);
    }
  }

  handleUserSelection(event: any, project_id: any) {
    // const projectId = selectElement.getAttribute('data-id');
    // const selectedUserId = selectElement.value;
    const projectId = project_id;
    const selectedUserId = event.target.value;

    // console.log(event.target.value, project_id);

    if (projectId && selectedUserId !== 'assign user') {
      this.assignUserToProject(projectId, selectedUserId);
    }
  }

  async assignUserToProject(project_id: string, user_id: string) {
    try {
      const response = await this.apiService.assignUserToProject(
        project_id,
        user_id
      );

      // Handle the response, update UI, or show messages as needed
      // console.log(response); // Log the response for debugging
      alert(response.message);
      // Optionally, you can fetch projects and users again to update the UI
      this.fetchProjects();
      this.fetchUsers();
      this.fetchUnassignedUsers();
    } catch (error) {
      console.error(error);
    }
  }

  handleUnassign(project_id: string) {
    const projectId = project_id;

    if (projectId) {
      this.unassignUserFromProject(projectId);
    }
  }

  async unassignUserFromProject(project_id: string) {
    try {
      const response = await this.apiService.unassignUserFromProject(
        project_id
      );

      // Handle the response, update UI, or show messages as needed
      console.log(response); // Log the response for debugging
      if (response.message) {
        alert(response.message);
      }
      // Optionally, you can fetch projects and users again to update the UI
      this.fetchProjects();
      this.fetchUsers();
      this.fetchUnassignedUsers();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProject(project_id: string) {
    try {
      await this.apiService.deleteProject(project_id);
      this.fetchProjects();
    } catch (error) {
      console.error(error);
    }
  }

  createProject() {
    this.router.navigate(['create-project']);
  }
  editProject(project_id: string) {
    localStorage.setItem('project_id', project_id);
    this.router.navigate(['edit-project']);
  }
}
