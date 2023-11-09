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
      console.log(this.projects);
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
    } catch (error) {
      console.error(error);
    }
  }

  handleUserSelection(selectElement: HTMLSelectElement) {
    const projectId = selectElement.getAttribute('data-id');
    const selectedUserId = selectElement.value;

    if (projectId && selectedUserId !== 'assign user') {
      this.assignUserToProject(projectId, selectedUserId);
    }
  }

  async assignUserToProject(project_id: string, user_id: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found.');
      return;
    }

    try {
      const response = await this.apiService.assignUserToProject(
        token,
        project_id,
        user_id
      );

      // Handle the response, update UI, or show messages as needed
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
  deleteProject(project_id: string) {}
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
    } catch (error) {
      console.error(error);
    }
  }
}
