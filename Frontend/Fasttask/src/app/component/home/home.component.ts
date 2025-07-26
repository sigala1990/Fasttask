import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ssesion } from 'src/app/model/ssesion/ssesion.model';
import { Token } from 'src/app/model/token/token.model';
import { User } from 'src/app/model/user/user.model';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user!: User;
  guess!: User;
  ssesion!: Ssesion;
  role: any;

  usuario!: any; //Usuario;

  //Ssesion;

  sigInFail = false;

  submitted: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

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
