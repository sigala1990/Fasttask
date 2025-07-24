import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user!: any;

  role: any;

  usuario!:any//Usuario;

  ssesion:any //Ssesion;

  sigInFail = false;

  submitted: boolean = false;

  constructor(private router: Router) {
    this.user = {
      username: '',
      password: ''
    }
     this.ssesion = {
      username: '',
      token: '',
      rol: ''
    }}

  ngOnInit(): void {
  }

registrar(event?: Event): void {
  if (event) {
    event.preventDefault();
  }
  console.log("Click");
  this.router.navigate(['areaClient']).then(success => {
    console.log('Navegación exitosa?', success);
  });
}

}
