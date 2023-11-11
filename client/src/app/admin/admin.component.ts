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

    console.log(event.target.value, project_id);

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

  handleUnassign(selectElement: HTMLElement) {
    const projectId = selectElement.getAttribute('data-id');

    if (projectId) {
      this.unassignUserFromProject(projectId);
    }
  }

  async unassignUserFromProject(project_id: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found.');
      return;
    }

    try {
      const response = await this.apiService.unassignUserFromProject(
        token,
        project_id
      );

      // Handle the response, update UI, or show messages as needed
      console.log(response); // Log the response for debugging
      // Optionally, you can fetch projects and users again to update the UI
      this.fetchProjects();
      this.fetchUsers();
      this.fetchUnassignedUsers();
    } catch (error) {
      console.error(error);
    }
  }

  deleteProject(project_id: string) {
    // Implement the logic to delete a project
    // This can be similar to the unassignUserFromProject method
    // You can call the API service method for deleting a project here
  }

  createProject() {
    // Implement the logic to navigate to the create project page
    // You can use the Angular Router for navigation
    // Example: this.router.navigate(['create-project']);
  }

  editProject(project_id: string) {
    // Implement the logic to store the project_id in local storage and navigate to the edit project page
    // You can use the Angular Router for navigation
    // Example: localStorage.setItem('project_id', project_id);
    //          this.router.navigate(['edit-project']);
  }
}
