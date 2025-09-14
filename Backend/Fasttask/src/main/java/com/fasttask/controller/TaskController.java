package com.fasttask.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasttask.common.Views;
import com.fasttask.dto.Task;
import com.fasttask.service.TaskServiceImpl;

@RestController
@RequestMapping("/api")
public class TaskController {

	@Autowired
	TaskServiceImpl taskServiceImpl;

	@GetMapping("/task/{id}")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public Task listarTaskById(@PathVariable int id) {
		return taskServiceImpl.listarTaskById(id);
	}

	@GetMapping("/tasks/{idLista}")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public List<Task> listarTaskByLista(@PathVariable int idLista) {
		return taskServiceImpl.listarTaskByLista(idLista);
	}

	@GetMapping("/task/switch1/{idLista}/{previousId}/{currentId}")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public void switchTaskInSameList(@PathVariable int idLista, @PathVariable int previousId,
			@PathVariable int currentId) {
		taskServiceImpl.switchTasksInSameList(idLista, previousId, currentId);
	}
	
	@GetMapping("/task/switch2/{idLista}/{listaOrigen}/{listaDestino}/{taskOrigen}/{taskDestino}")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public void switchTaskInNotSameList(@PathVariable int idLista, @PathVariable int listaOrigen, @PathVariable int listaDestino,
			@PathVariable int taskOrigen,@PathVariable int taskDestino) {
		taskServiceImpl.switchTasksInNotSameList(idLista,listaOrigen, listaDestino,taskOrigen ,taskDestino);
	}

	@PostMapping("task/create")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public Task crearTask(@RequestBody Task task) {
		return taskServiceImpl.crearTask(task);
	}

	@PutMapping("task/update")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public Task actualizarTask(@RequestBody Task task) {
		return taskServiceImpl.actualizarTask(task);
	}

	@DeleteMapping("/task/{idTask}")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public void eliminarTask(@PathVariable int idTask) {
		taskServiceImpl.eliminarTask(idTask);
	}

}
