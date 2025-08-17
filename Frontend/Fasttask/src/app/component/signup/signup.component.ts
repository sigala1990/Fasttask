import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Userr } from 'src/app/model/userr/userr.model';
import { LoginService } from 'src/app/service/auth/login/login.service';
import { UserrService } from 'src/app/service/userr/userr.service';
import { Ssesion_util } from 'src/app/service/util/ssesion_util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  formulario!: FormGroup;
  starForm = new FormGroup({
    star: new FormControl(),
  });

  loginGuest: boolean = false;
  pwd1 = '';
  pwd2 = '';
  userr: Userr = {
    id: 0,
    username: '',
    rol: '',
    email: '',
    fecha_nacimiento: '',
  };

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private userrService: UserrService,
    private loginService: LoginService,
    private ssesion_util: Ssesion_util
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group(
      {
        username: ['123', [Validators.required, Validators.minLength(3)]],
        email: ['123@gmail.com', [Validators.required, Validators.email]],
        fecha_nacimiento: ['2025-07-09', [Validators.required, this.fechaNoFutura]],
        password: ['123', [Validators.required]],
        confirmPassword: ['123', [Validators.required]],
      },
      { validators: this.contraseñasIguales, }
    );
  }

  fechaNoFutura(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;

    if (!valor) return null; // Si está vacío, no valida aquí

    const fechaIngresada = new Date(valor);
    const hoy = new Date();

    // Borramos horas para comparar solo fechas
    fechaIngresada.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);

    return fechaIngresada > hoy ? { fechaFutura: true } : null;
  }

  contraseñasIguales(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { noCoinciden: true };
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      console.log('Formulario válido', this.formulario.value);
      this.getToken();
    } else {
      console.log('Formulario inválido');
      this.formulario.markAllAsTouched();
    }
  }

  get f() {
    return this.formulario.controls;
  }


  createUserr(): void {
    console.log('Empezando create Userr');
    this.userr = this.formulario.value;
    this.userr.fecha_nacimiento = formatDate(this.userr.fecha_nacimiento, 'yyyy-MM-dd', 'en');
    console.log('Creando usuario:', this.userr);
      this.userrService.createUserr(this.userr).subscribe({
        next: (userr) => {

          window.sessionStorage.setItem('idUserr', userr.id.toString());
          window.sessionStorage.setItem('nameUserr', userr.username);

          console.log('Usuario creado:', userr);
          this.router.navigate(['/areaClient']);
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          this._snackBar.open(error.message, 'Cerrar', {
            duration: 3000,
          });
        },
      });

  }

  getToken(){
    this.ssesion_util.clearSessionData();
    const userrGuest = {
      username: 'guest',
      password: 'password',
    };
    this.loginService.login(userrGuest).subscribe({
      next: (token) => {
        window.sessionStorage.setItem('auth-token', token.token);
         console.log('Token de sesión guardado:', window.sessionStorage.getItem('auth-token'));
        this.loginGuest = true;
        console.log(this.loginGuest)
        this.createUserr();  
      },
      error: (error) => {
        console.error('Error al crear la nueva cuenta:', error);
        this._snackBar.open(error.message, 'Cerrar', {
          duration: 3000,
        });
        this.loginGuest = false;
      },
    });
  }
}
