import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { Ssesion } from 'src/app/model/ssesion/ssesion.model';
import { Token } from 'src/app/model/token/token.model';
import { User } from 'src/app/model/user/user.model';
import { Userr } from 'src/app/model/userr/userr.model';
import { LoginService } from 'src/app/service/auth/login/login.service';
import { UserrService } from 'src/app/service/userr/userr.service';
import { formatDate } from '@angular/common';
import { Ssesion_util } from 'src/app/service/util/ssesion_util';
import { SessionDataService } from 'src/app/service/sessionData/session-data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user!: User;
  userr!: Userr;
  ssesion!: Ssesion;
  sigInFail: boolean = false;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private serviceUserr: UserrService,
    private ssesion_util: Ssesion_util,
    private sessionDataService: SessionDataService,
    private translate: TranslateService
  ) {
    const savedLang = localStorage.getItem('lang') || 'es';
    translate.use(savedLang);
    // this.user = {
    //   username: 'adria',
    //   password: '123',
    // };
       this.user = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {}

  login(): void {
    this.ssesion_util.clearSessionData();
    console.log('Lanzando login');
    console.log(this.user);
    this.loginService.login(this.user).subscribe({
      next: (token: Token) => {
        window.sessionStorage.setItem('auth-token', token.token);

        this.userr = {
          id: 0,
          username: this.user.username,
          email: '',
          rol: '',
          fecha_nacimiento: '',
        };
        console.log(window.sessionStorage.getItem('auth-token'));
        this.authenticacion(this.userr);
      },
      error: (error: Error) => {
        console.log(`Nombre del error: ${error}`);
        this.sigInFail = true;
      },
    });
  }

  authenticacion(userr: Userr): void {
    this.serviceUserr.userrByUsername(this.userr.username).subscribe({
      next: (userr: Userr) => {
        this.userr = userr;
        this.userr.fecha_nacimiento = formatDate(
          userr.fecha_nacimiento,
          'dd/MM/yyyy',
          'en'
        );
        console.log('Usuario obtenido:', userr);

        this.sessionDataService.setIdUserr(userr);
        window.sessionStorage.setItem('idUserr', userr.id.toString());
        this.sessionDataService.setNameUserr(userr);
        window.sessionStorage.setItem('nameUserr', userr.username);

        this.router.navigate(['areaClient', this.userr.id]);
      },
      error: (error: any) => {
        console.error('Error al obtener el usuario:', error);
      },
    });
  }

  crearCuenta(): void {
    this.router.navigate(['signup']).then((success) => {
      console.log('Navegación exitosa?', success);
    });
  }
}
