import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ProjectAPIService } from '../services/project-api.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  projectData: {
    project_name: string;
    project_description: string;
    dueDate: string;
  } = {
    project_name: '',
    project_description: '',
    dueDate: '',
  };
  MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  showDatepicker = false;
  datepickerValue!: string;
  month!: number; // !: mean promis it will not be null, and it will definitely be assigned
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];

  constructor(private router: Router, private apiService: ProjectAPIService) {}

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
  }
  initDate() {
    const today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.datepickerValue = new Date(
      this.year,
      this.month,
      today.getDate()
    ).toDateString();
  }

  isToday(date: any) {
    const today = new Date();
    const selectedDate = new Date(this.year, this.month, date);
    return selectedDate >= today;
  }

  getDateValue(date: any) {
    const selectedDate = new Date(this.year, this.month, date);
    if (selectedDate >= new Date()) {
      this.datepickerValue = selectedDate.toDateString();
      this.showDatepicker = false;
    }
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }

  projectNameError: string = '';
  projectDescriptionError: string = '';

  trackByIdentity = (index: number, item: any) => item;

  onSubmit() {
    this.projectNameError = '';
    this.projectDescriptionError = '';

    if (this.projectData.project_name.trim() === '') {
      this.projectNameError = 'Project Name is required';
      return;
    }
    if (this.projectData.project_description.trim() === '') {
      this.projectDescriptionError = 'Project Description is required';
      return;
    }

    const selectedDate = new Date(this.datepickerValue);
    const formattedDate = `${selectedDate.getFullYear()}-${(
      selectedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

    const projectData = {
      project_name: this.projectData.project_name,
      project_description: this.projectData.project_description,
      dueDate: formattedDate,
    };

    try {
      this.apiService.createProject(projectData);

      this.router.navigate(['/admin']);
    } catch (error) {
      console.log(error);
    }
  }
}
