import { Component, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

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

  // tableross = ['To Do', 'In Progress', 'Done'];
  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  

  tableross = [
  {
    nombre: 'To Do',
    tasks: ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep']
  },
  {
    nombre: 'In Progress',
    tasks: ['Write report', 'Fix bugs', 'Prepare presentation']
  },
  {
    nombre: 'Done',
    tasks: ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog']
  }
];
  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
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

  createLista(nameNewLista: string) {
    if (nameNewLista.trim()) {
        this.tableross.push({ nombre: nameNewLista, tasks: [] });
    }
    //falta popup
  }

  createTask(nameNewTask: string, idTablero: number) {
    if (nameNewTask.trim()) {
        this.tableross[idTablero].tasks.push(nameNewTask);
    }
    //falta popup  
    this.newTask = '';
    this.creandoTask = false;
  }

  setIdRowTask(id: number) {
    this.idRowTask = id;
  }
}
