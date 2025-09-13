package com.fasttask.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasttask.DAO.ITaskDAO;
import com.fasttask.dto.Task;

@Service
public class TaskServiceImpl implements ITaskService{

	@Autowired
	ITaskDAO iTaskDAO;
	
	@Override
	public Task listarTaskById(int id) {
		return iTaskDAO.findById(id);
	}

	@Override
	public List<Task> listarTaskByLista(int id) {
		return iTaskDAO.findByListaFk(id);
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

}
