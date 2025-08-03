package com.fasttask.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasttask.common.Views;
import com.fasttask.dto.Tablero;
import com.fasttask.service.TableroServiceImpl;



@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.DELETE })
public class TableroController {

	@Autowired
	TableroServiceImpl tableroServiceImpl;
	
	@GetMapping("/tableros/{idUserr}")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public List<Tablero> listar_tableros_xUserr(@PathVariable Long idUserr) {
		return tableroServiceImpl.listarTableroByUserr(idUserr);
	}
	
	@GetMapping("/tablero/{id}")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public Tablero listarTableroById(@PathVariable int id) {
		return tableroServiceImpl.listarTableroById(id);
	}

	
	@PostMapping("/tablero/create")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public Tablero crearTablero(@RequestBody Tablero tablero) {
		System.out.println(tablero.getNombre());
		return tableroServiceImpl.crearTablero(tablero);
	}
	
}
