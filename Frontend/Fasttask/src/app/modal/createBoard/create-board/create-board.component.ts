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
    'linear-gradient(135deg, #e0e7ef 0%, #e0e7ef 100%)',
    'linear-gradient(135deg, #49b3fc 0%, #2566d6 100%)',
    'linear-gradient(135deg, #14181fff 0%, #d7db00ff 100%)',
    'linear-gradient(135deg, #3a7bd5 0%, #a16ae8 100%)',
    'linear-gradient(135deg, #a16ae8 0%, #f16ba2 100%)',
    'linear-gradient(135deg, #f16ba2 0%, #ff6b6b 100%)',
  ];
  fondoSeleccionado: string = this.colores[0];
}
