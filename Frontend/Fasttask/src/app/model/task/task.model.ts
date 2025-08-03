export interface Task {
  id: number;
  nombre: string;
  lista_fk: string;
  image: string;
  descripcion: string;
  completada: boolean;
  fecha_creacion: string;
  fecha_modificacion: string;
  fecha_task_ini: string;
  fecha_task_fin: string;
  // prioridad: string;

}
