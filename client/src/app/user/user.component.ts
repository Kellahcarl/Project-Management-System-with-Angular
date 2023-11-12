import { Component, OnInit } from '@angular/core';

import { ProjectAPIService } from '../services/project-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  projectData: {
    project_id: string;
    project_name: string;
    project_description: string;
    dueDate: Date;
    project_status: string;
  } = {
    project_id: '',
    project_name: '',
    project_description: '',
    dueDate: new Date(),
    project_status: '',
  };

  constructor(private apiService: ProjectAPIService) {}

  ngOnInit() {
    this.getAssignedProject();
  }

  getAssignedProject() {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.getUserToAssignedProject(token).then((data) => {
        // this.projectData = data;
        // console.log(data);

        const user_id = data.info.id;

        // console.log(user_id);

        this.apiService.getAssignedProject(user_id).then((data) => {
          // console.log(data);

          this.projectData = data;

          // console.log(this.projectData);
        });
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
  getStatusColorClass(status: string): string {
    switch (status) {
      case 'assigned':
        return 'bg-gray-500 rounded';
      case 'in Progress':
        return 'bg-yellow-500 rounded';
      case 'completed':
        return 'bg-green-500 rounded';
      default:
        return 'bg-gray-300 rounded';
    }
  }
}
