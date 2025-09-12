import { Component, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TableroService } from 'src/app/service/tablero/tablero.service';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from 'src/app/service/lista/lista.service';
import { Lista } from 'src/app/model/lista/lista.model';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
})
export class TableroComponent implements OnInit {
  idRowTask?: number;
  creandoTask = false;
  creandoLista = false;
  newTask: string = '';
  newLista: string = '';

  tablero: any;
  constructor(
    private tableroService: TableroService,
    private listaService: ListaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.params['idTablero']);
    this.getTablero(this.route.snapshot.params['idTablero']);
  }

   dropList(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tablero, event.previousIndex, event.currentIndex);
  }
  dropTasks(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addTask(idRowTask: number) {
    this.creandoTask = true;
    this.setIdRowTask(idRowTask);
  }
  addLista() {
    this.creandoLista = true;
  }
  createLista(nombreLista: string, idTablero: string) {
    if (nombreLista.trim()) {
      const lista: Lista = { nombre: nombreLista, tableroFk: idTablero };

      this.listaService.createLista(lista).subscribe({
        next: (lista) => {
          console.log('Lista creada:', lista);
          this.getTablero(this.route.snapshot.params['idTablero']);
          this.newLista = '';
          this.creandoLista = false;
        },
        error: (error) => {
          console.error('Error al crear lista:', error);
        },
      });
    }
    //falta popup
  }

  updateLista(nombreLista:string, idLista:number, orden:number) {
    const lista: Lista = { id: idLista, nombre: nombreLista, orden: orden, tableroFk: this.route.snapshot.params['idTablero'] };
    this.listaService.updateLista(lista).subscribe({
      next: (lista) => {
        console.log('Lista actualizada:', lista);
        this.getTablero(this.route.snapshot.params['idTablero']);
        //alert lista actualizada
      },
      error: (error) => {
        console.error('Error al actualizar lista:', error);
      },
    });
  }
  eliminarLista(idLista: number) {
    this.listaService.deleteLista(idLista).subscribe({
      next: () => {
        console.log('Lista eliminada');
        this.getTablero(this.route.snapshot.params['idTablero']);
        //alert tablero eliminado
      },
      error: (error) => {
        console.error('Error al eliminar lista:', error);
      },
    });
  }

  createTask(nameNewTask: string, idTablero: number) {
    if (nameNewTask.trim()) {
      // this.tableross[idTablero].tasks.push(nameNewTask);
    }
    //falta popup
    this.newTask = '';
    this.creandoTask = false;
  }

  setIdRowTask(id: number) {
    this.idRowTask = id;
  }

  getTablero(id: number) {
    this.tableroService.tableroById(id).subscribe({
      next: (tablero) => {
        this.tablero = tablero;
      },
      error: (error) => {
        console.error('Error get tablero:', error);
      },
    });
  }
}
