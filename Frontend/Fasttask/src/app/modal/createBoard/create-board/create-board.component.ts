import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tablero } from 'src/app/model/tablero/tablero.model';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css'],
  providers: [{ provide: 'DIALOG_DATA', useValue: {} }],
})
export class CreateBoardComponent {
  nombreTablero: string = '';
  imagen: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: Tablero) {}

  colores: string[] = [
    'linear-gradient(135deg, #a0b5eb 0%, #c9f0e4 100%)',
    'linear-gradient(135deg, #65f4cd 0%, #4799e9 100%)',
    'linear-gradient(135deg, #789f0c 0%, #ffe100 100%)',
    'linear-gradient(135deg, #3a7bd5 0%, #a16ae8 100%)',
    'linear-gradient(135deg, #a16ae8 0%, #f16ba2 100%)',
    'linear-gradient(135deg, #191654 0%, #43c6ac 100%)',
  ];
  fondoSeleccionado: string = this.colores[0];
}
