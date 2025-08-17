import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nameUserr: string = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.nameUserr = window.sessionStorage.getItem('nameUserr') ?? '';
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.removeItem("auth-token");
    this.router.navigate(['home']);
  }
}
