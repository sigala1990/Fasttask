import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionDataService } from 'src/app/service/sessionData/session-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nameUserr: string = '';
  idUserr: string = '';
  constructor(private router: Router, private sessionDataService: SessionDataService) { }

  ngOnInit(): void {
  const id = window.sessionStorage.getItem('idUserr');
  const username = window.sessionStorage.getItem('nameUserr');
  if (id && username) {
    this.sessionDataService.setIdUserr({ id: +id, username, email: '', rol: '', fecha_nacimiento: '' });
    this.sessionDataService.setNameUserr({ id: +id, username, email: '', rol: '', fecha_nacimiento: '' });
  }

    this.sessionDataService.userr$.subscribe((userr) => {
      this.nameUserr = userr?.username ?? '';
      this.idUserr = userr?.id ? userr.id.toString() : '';
    });
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.sessionDataService.clearUserr();
    this.router.navigate(['home']);

    console.log('session IdUser: ' + sessionStorage.getItem('idUserr'));
    console.log('session nameUser: ' + sessionStorage.getItem('nameUserr'));
    //window.location.reload();
  }
}
