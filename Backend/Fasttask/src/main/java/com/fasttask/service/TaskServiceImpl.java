package com.fasttask.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasttask.DAO.IListaDAO;
import com.fasttask.DAO.ITaskDAO;
import com.fasttask.dto.Lista;
import com.fasttask.dto.Task;

@Service
public class TaskServiceImpl implements ITaskService{

	@Autowired
	ITaskDAO iTaskDAO;
	@Autowired
	IListaDAO iListaDAO;
	
	@Override
	public Task listarTaskById(int id) {
		return iTaskDAO.findById(id);
	}

	@Override
	public List<Task> listarTaskByLista(int id) {
		return iTaskDAO.findByListaFkOrderByOrdenAsc(id);
	}

	@Override
	public Task crearTask(Task task) {
		Date fecha = new Date();
		task.setFecha_creacion(fecha);
		task.setFecha_modificacion(fecha);
		
		task.setOrden(iTaskDAO.findMaxOrdenByListaFk(task.getListaFk())+ 1);
		return iTaskDAO.save(task);
	}

	@Override
	public Task actualizarTask(Task task) {
		Date fecha = new Date();
		task.setFecha_modificacion(fecha);
		return iTaskDAO.save(task);
	}

	@Override
	public void eliminarTask(int id) {
		iTaskDAO.deleteById(id);	
	}

	@Override
	public void switchTasksInSameList(int idLista,  int previousIndex, int currentIndex) {
		List<Task> task = iTaskDAO.findByListaFkOrderByOrdenAsc(idLista);
		
		Task taskMovida = task.remove(previousIndex);
		task.add(currentIndex, taskMovida);
		
		for (int i = 0; i < task.size(); i++) {
			task.get(i).setOrden(i);
			iTaskDAO.save(task.get(i));
		}
	}

	@Override
	public void switchTasksInNotSameList(int idLista, int listaOrigen, int listaDestino, int taskOrigen, int taskDestino) {
		Lista lista = iListaDAO.findById(idLista);
		List<Lista> listas = iListaDAO.findByTableroFkOrderByOrdenAsc(lista.getTableroFk());
		
		List<Task> tasksOrigen = iTaskDAO.findByListaFkOrderByOrdenAsc(listas.get(listaOrigen).getId());
		List<Task> tasksDestino = iTaskDAO.findByListaFkOrderByOrdenAsc(listas.get(listaDestino).getId());
		
		Task taskMovida = tasksOrigen.remove(taskOrigen);
		taskMovida.setListaFk(listas.get(listaDestino).getId());
		tasksDestino.add(taskDestino, taskMovida);
		
		for (int i = 0; i < tasksOrigen.size(); i++) {
			tasksOrigen.get(i).setOrden(i);
			iTaskDAO.save(tasksOrigen.get(i));
		}
		
		for (int i = 0; i < tasksDestino.size(); i++) {
			tasksDestino.get(i).setOrden(i);
			iTaskDAO.save(tasksDestino.get(i));
		}
		
		
		
		
	}

}
