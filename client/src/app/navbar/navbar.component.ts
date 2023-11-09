import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {


  constructor(private router: Router) {}
  // loggedIn!:boolean

  loggedInTrue = localStorage.getItem('loggedIn');

  loggedIn = this.loggedInTrue;

  ngOnInit(): void {
   
  }

  isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    this.router.navigate(['']);
    // console.log(localStorage.getItem('token'));
  };

  date = new Date();
}

