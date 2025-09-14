package com.fasttask.service;

import java.util.List;

import com.fasttask.dto.Task;

public interface ITaskService {

	public Task listarTaskById(int id);
	public List<Task> listarTaskByLista(int id);
	public Task crearTask(Task task);
	public Task actualizarTask(Task task);
	public void eliminarTask(int id);
	public void switchTasksInSameList(int idLista, int idTask1, int idTask2); 
}
