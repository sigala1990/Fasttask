import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tablero } from 'src/app/model/tablero/tablero.model';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css'],
  providers: [{ provide: 'DIALOG_DATA', useValue: {} }]
})
export class CreateBoardComponent  {
  nombreTablero: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: Tablero) { }


}
