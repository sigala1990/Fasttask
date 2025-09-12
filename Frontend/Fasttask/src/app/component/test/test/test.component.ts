import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  // timePeriods = [
  //   'Bronze age',
  //   'Iron age',
  //   'Middle ages',
  //   'Early modern period',
  //   'Long nineteenth century',
  // ];
  //   todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  tablero: any = [
    {
      id: 1,
      nombre: 'Zoolooogico',
      usuarioFk: 9,
      imagen: 'padlock.png',
      fecha_creacion: '2025-08-18T00:00:00.000+00:00',
      fecha_modificacion: '2025-08-18T00:00:00.000+00:00',
      listas: [
        {
          id: 69,
          nombre: '1dd',
          tableroFk: 1,
          fecha_creacion: null,
          fecha_modificacion: '2025-09-11T23:15:56.389+00:00',
          orden: 1,
          tasks: [
            {
              id: 7,
              nombre: 't1',
              listaFk: 69,
              descripcion: null,
              completada: 0,
              orden: 3,
              fecha_creacion: null,
              fecha_modificacion: null,
              fecha_task_ini: null,
              fecha_task_fin: null,
            },
            {
              id: 8,
              nombre: 't2',
              listaFk: 69,
              descripcion: null,
              completada: 0,
              orden: 2,
              fecha_creacion: null,
              fecha_modificacion: null,
              fecha_task_ini: null,
              fecha_task_fin: null,
            },
            {
              id: 9,
              nombre: 't3',
              listaFk: 69,
              descripcion: null,
              completada: 0,
              orden: 1,
              fecha_creacion: null,
              fecha_modificacion: null,
              fecha_task_ini: null,
              fecha_task_fin: null,
            },
          ],
        },
        {
          id: 70,
          nombre: '2',
          tableroFk: 1,
          fecha_creacion: '2025-09-11T23:07:42.270+00:00',
          fecha_modificacion: '2025-09-11T23:07:42.270+00:00',
          orden: 2,
          tasks: [],
        },
      ],
    },
  ];
connectedTaskLists: string[] = [];
  constructor() {}

  ngOnInit(): void {
      this.connectedTaskLists = this.tablero[0].listas.map((lista: any, i: number) => `taskList${i}`);
  }
  dropList(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.tablero[0].listas,
      event.previousIndex,
      event.currentIndex
    );
  }
  dropTask(event: CdkDragDrop<string[]>) {
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
}
