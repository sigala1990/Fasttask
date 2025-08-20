import { formatDate } from '@angular/common';
import { TableroService } from './../../service/tablero/tablero.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from 'src/app/modal/createBoard/create-board/create-board.component';
import { Tablero } from 'src/app/model/tablero/tablero.model';
import { Userr } from 'src/app/model/userr/userr.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-area-client',
  templateUrl: './area-client.component.html',
  styleUrls: ['./area-client.component.css'],
})
export class AreaClientComponent implements OnInit {
  // result: boolean = false;
  newTablero!: Tablero;
  tableros: any;

  constructor(
    private tableroService: TableroService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
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

  open_tablero(id: number) {
    this.router.navigate(['tablero', id], { relativeTo: this.route });
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
          const currentUrl = this.router.url;
          this.router.navigate([currentUrl+'/tablero/', tablero.id], { relativeTo: this.route });
        },
        error: (error) => {
          console.error('Error al crear el tablero:', error);
        },
      });
  }
  getTableroByUserrId(id: number) {
    return this.tableroService.tableroByUserrId(id).subscribe({
      next: (tableros) => {
        this.tableros = tableros;
        console.log('Tablero obtenido:', tableros);
      },
      error: (error) => {
        console.error('Error al obtener el tablero:', error);
      },
    });
  }
}
