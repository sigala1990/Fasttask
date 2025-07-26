import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { Ssesion } from 'src/app/model/ssesion/ssesion.model';
import { Token } from 'src/app/model/token/token.model';
import { User } from 'src/app/model/user/user.model';
import { Userr } from 'src/app/model/userr/userr.model';
import { LoginService } from 'src/app/service/auth/login/login.service';
import { UserrService } from 'src/app/service/userr/userr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user!: User;
  userr!: Userr;
  guess!: User;
  ssesion!: Ssesion;
  role: any;

  usuario!: any; //Usuario;

  //Ssesion;

  sigInFail = false;

  submitted: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private serviceUserr: UserrService
  ) {
    this.user = {
      username: 'adria',
      password: 'password',
    };
  }

  ngOnInit(): void {}

  login(): void {
    console.log('Lanzando login');
    console.log(this.user);
    this.loginService.login(this.user).subscribe({
      next: (token: Token) => {
        window.sessionStorage.setItem('auth-token', token.token);
        console.log('Token guardado en sessionStorage:', token.token);
        this.userr ={
          username: this.user.username,
          email: '',
          rol: '',
        }
         console.log(window.sessionStorage.getItem('auth-token'));
        this.authenticacion(this.userr);
      },
      error: (error: Error) => {
        console.log(
          `Nombre del error: ${error}`
        );
      },
    });
  }

  authenticacion(userr: Userr): void {
    this.serviceUserr.userrByUsername(this.userr.username).subscribe({
      next: (userr: Userr) => {
        console.log('Usuario obtenido:', userr);
        userr.email = this.userr.email;

      },
      error: (error: any) => {
        console.error('Error al obtener el usuario:', error);
        console.log(
          `Nombre del error: ${error}`
        );
      },
    });
  }

  registrar(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    console.log('Click');
    this.router.navigate(['areaClient']).then((success) => {
      console.log('Navegación exitosa?', success);
    });
  }

  loginGuess(): void {
    console.log('atencion guess');
    console.log(this.guess);
    this.loginService.login(this.guess).subscribe({
      next: (token: Token) => {
        window.sessionStorage.setItem('auth-token', token.token);
        // this.listBooks();
      },
      error: (resultError: Error) => {
        console.log(
          `Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`
        );
      },
    });
  }

  crearCuenta(): void {
    this.router.navigate(['signup']).then((success) => {
      console.log('Navegación exitosa?', success);
    });
  }
}
