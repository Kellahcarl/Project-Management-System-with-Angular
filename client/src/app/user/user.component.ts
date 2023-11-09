import { Component, OnInit } from '@angular/core';

import { ProjectAPIService } from '../services/project-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  projectData: any = {};

  constructor(private apiService: ProjectAPIService) {}

  ngOnInit() {
    this.getAssignedProject();
  }

  getAssignedProject() {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.getAssignedProject(token).then((data) => {
        this.projectData = data;
        console.log(data);
      });
    }
  }

  markInProgress() {
    if (this.projectData.project_id) {
      this.apiService.markInProgress(this.projectData.project_id).then(() => {
        this.getAssignedProject();
      });
    }
  }

  markComplete() {
    if (this.projectData.project_id) {
      this.apiService.markComplete(this.projectData.project_id).then(() => {
        this.getAssignedProject();
      });
    }
  }
}
