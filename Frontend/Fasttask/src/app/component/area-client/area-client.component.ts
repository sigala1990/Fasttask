import { formatDate } from '@angular/common';
import { TableroService } from './../../service/tablero/tablero.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from 'src/app/modal/createBoard/create-board/create-board.component';
import { Tablero } from 'src/app/model/tablero/tablero.model';
import { Userr } from 'src/app/model/userr/userr.model';

@Component({
  selector: 'app-area-client',
  templateUrl: './area-client.component.html',
  styleUrls: ['./area-client.component.css'],
})
export class AreaClientComponent implements OnInit {
  // result: boolean = false;
  newTablero!: Tablero;

  constructor(
    private tableroService: TableroService,
    private dialog: MatDialog
  ) {
this.newTablero = {
      nombre: '',
      usuarioFk: 0,
      image: '',
      descripcion: '',
      fecha_creacion: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      fecha_modificacion: formatDate(new Date(), 'yyyy-MM-dd', 'en')
    };

  }

  ngOnInit(): void {
    this.getTableroByUserrId(Number(window.sessionStorage.getItem('idUserr')));
  }

  open_modal() {
    this.dialog
      .open(CreateBoardComponent, {
        width: '300px',
        height: '400px',
        data: {},
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((result) => {
        // this.result = result;
        console.log('Dialog closed', result);
        if (result) this.crearTablero(result);
      });
  }

  crearTablero(nombreTablero: string) {
    // this.newTablero = {
    //   nombre: nombreTablero,
    //   usuarioFk: Number(window.sessionStorage.getItem('idUserr')), // Asignar el ID del usuario actual
    //   image: '',
    //   descripcion: '',
    //   fecha_creacion: '',
    //   fecha_modificacion: ''
    // };
    this.newTablero.nombre = nombreTablero;
    this.newTablero.image = 'azul';
    this.newTablero.fecha_creacion = formatDate(this.newTablero.fecha_creacion, 'yyyy-MM-dd', 'en');
    this.newTablero.fecha_modificacion = formatDate(this.newTablero.fecha_modificacion, 'yyyy-MM-dd', 'en');
    this.newTablero.usuarioFk = Number(window.sessionStorage.getItem('idUserr'));

    this.tableroService
      .createTablero(this.newTablero)
      .subscribe({
        next: (tablero) => {
          console.log('Tablero creado:', tablero);
        },
        error: (error) => {
          console.error('Error al crear el tablero:', error);
        },
      });
  }
  getTableroByUserrId(id: number) {
    return this.tableroService.tableroByUserrId(id).subscribe({
      next: (tablero) => {
        console.log('Tablero obtenido:', tablero);
      },
      error: (error) => {
        console.error('Error al obtener el tablero:', error);
      },
    });
  }
}
