export interface Task {
  id?: number;
  nombre?: string;
  listaFk?: number;
  image?: string;
  descripcion?: string;
  completada?: number;
  fecha_creacion?: string;
  fecha_modificacion?: string;
  fecha_task_ini?: string;
  fecha_task_fin?: string;
  orden?: number;
  // prioridad: string;

}
