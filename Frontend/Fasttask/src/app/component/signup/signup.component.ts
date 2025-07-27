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
// import { Rol } from 'src/app/models/enum/rol/rol.model';
// import { Token } from 'src/app/models/token/token.model';
// import { User } from 'src/app/models/user/user.model';
// import { LoginService } from 'src/app/services/auth/login.service';
// import { SsesionService } from 'src/app/services/auth/ssesion.service';
// import { UsuarioService } from 'src/app/services/usuario/usuario.service';

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

  pwd1 = '';
  pwd2 = '';
  userr: Userr = {
    username: '',
    rol: '',
    email: '',
    fecha_nacimiento: '',
  };

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        fechaNacimiento: ['', [Validators.required, this.fechaNoFutura]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
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
    } else {
      console.log('Formulario inválido');
      this.formulario.markAllAsTouched();
    }
  }

  get f() {
    return this.formulario.controls;
  }
}
