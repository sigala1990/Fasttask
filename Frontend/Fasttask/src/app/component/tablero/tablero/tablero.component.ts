import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { Task } from 'src/app/model/task/task.model';
import { TaskService } from 'src/app/service/task/task.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
})
export class TableroComponent implements OnInit {

  @ViewChild('newListaInput') newListaInput!: ElementRef;
  @ViewChild('newTaskInput') newTaskInput!: ElementRef;

  idRowTask?: number;
  creandoTask = false;
  creandoLista = false;
  newTask: string = '';
  newLista: string = '';
  connectedTaskLists: string[] = [];

  tablero?: any;
  constructor(
    private tableroService: TableroService,
    private listaService: ListaService,
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // if (this.tablero) {

    // }
    console.log(this.route.snapshot.params['idTablero']);
    this.getTablero(this.route.snapshot.params['idTablero']);
  }

  dropList(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.tablero.listas,
      event.previousIndex,
      event.currentIndex
    );

    this.switchLista(event.previousIndex, event.currentIndex);
  }
  dropTasks(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let listaFk = event.container.data[event.previousIndex].listaFk;
      if (typeof listaFk === 'number') {
        this.switchTaskInSameList(
          listaFk,
          event.previousIndex,
          event.currentIndex
        );
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const idLista = event.container.data[event.currentIndex].listaFk;
      const listaOrigen = event.previousContainer.id.charAt(
        event.previousContainer.id.length - 1
      );
      const listaDestino = event.container.id.charAt(
        event.container.id.length - 1
      );
      const taskOrigen = event.previousIndex;
      const taskDestino = event.currentIndex;

      this.switchTaskInDifferentList(
        idLista as number,
        listaOrigen as string,
        listaDestino as string,
        taskOrigen,
        taskDestino
      );
    }
  }
  switchTaskInSameList(idList: number, idTask: number, newPosition: number) {
    this.taskService
      .switchTaskInSameList(idList, idTask, newPosition)
      .subscribe({
        next: () => {
          this.getTablero(this.route.snapshot.params['idTablero']);
        },
        error: (error) => {
          console.error(
            'Error al intercambiar tareas en la misma lista:',
            error
          );
        },
      });
  }
  switchTaskInDifferentList(
    idLista: number,
    listaOrigen: string,
    listaDestino: string,
    taskOrigen: number,
    taskDestino: number
  ) {
    this.taskService
      .switchTaskInDifferentList(
        idLista,
        listaOrigen,
        listaDestino,
        taskOrigen,
        taskDestino
      )
      .subscribe({
        next: () => {
          // console.log('Tareas intercambiadas en diferentes listas');
          this.getTablero(this.route.snapshot.params['idTablero']);
        },
        error: (error) => {
          console.error(
            'Error al intercambiar tareas en diferentes listas:',
            error
          );
        },
      });
  }
  switchLista(idOrigen: number, idDestino: number) {
    const listaOrigen = this.tablero.listas.find(
      (lista: Lista) => lista.id === idOrigen
    );
    const listaDestino = this.tablero.listas.find(
      (lista: Lista) => lista.id === idDestino
    );
    const idTablero = this.route.snapshot.params['idTablero'];
    this.listaService.switchListas(idTablero, idOrigen, idDestino).subscribe({
      next: () => {
        // console.log('Listas intercambiadas');
        this.getTablero(this.route.snapshot.params['idTablero']);
      },
      error: (error) => {
        console.error('Error al intercambiar listas:', error);
      },
    });
  }
  addTask(idRowTask: number) {
    this.creandoTask = true;
    this.setIdRowTask(idRowTask);
     setTimeout(() => {
    this.newTaskInput?.nativeElement.focus();
  }, 0);
  }
  addLista() {
    this.creandoLista = true;
      setTimeout(() => {
    this.newListaInput?.nativeElement.focus();
  }, 0);
  }
  cancelCreateTask(){
    this.creandoTask = false;
    this.newTask = '';
  }
  cancelCreateLista() {
    this.creandoLista = false;
    this.newLista = '';
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
  updateLista(nombreLista: string, idLista: number, orden: number) {
    const lista: Lista = {
      id: idLista,
      nombre: nombreLista,
      orden: orden,
      tableroFk: this.route.snapshot.params['idTablero'],
    };
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
  createTask(nameNewTask: string, idLista: number) {
    if (nameNewTask.trim()) {
      const newTask: Task = { nombre: nameNewTask, listaFk: idLista };
      this.taskService.createTask(newTask).subscribe({
        next: () => {
          console.log('Task creada');
          this.getTablero(this.route.snapshot.params['idTablero']);
        },
        error: (error) => {
          console.error('Error al crear task:', error);
        },
      });
    }
    //falta popup
    this.newTask = '';
    this.creandoTask = false;
  }
  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe({
      next: () => {
        console.log('Task actualizada');
        this.getTablero(this.route.snapshot.params['idTablero']);
      },
      error: (error) => {
        console.error('Error al actualizar task:', error);
      },
    });
  }
  eliminarTask(idTask: number) {
    this.taskService.deleteTask(idTask).subscribe({
      next: () => {
        console.log('Task eliminada');
        this.getTablero(this.route.snapshot.params['idTablero']);
        //alert tablero eliminado
      },
      error: (error) => {
        console.error('Error al eliminar task:', error);
      },
    });
  }
  setIdRowTask(id: number) {
    this.idRowTask = id;
  }
  getTablero(id: number) {
    this.tableroService.tableroById(id).subscribe({
      next: (tablero) => {
        this.tablero = tablero;
        this.connectedTaskLists = this.tablero.listas.map(
          (lista: any, i: number) => `taskList${i}`
        );
      },
      error: (error) => {
        console.error('Error get tablero:', error);
      },
    });
  }
}
