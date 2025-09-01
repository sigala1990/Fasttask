package com.fasttask.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasttask.common.Views;
import com.fasttask.dto.Lista;
import com.fasttask.service.ListaServiceImpl;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api")
public class ListaController {
	
	@Autowired
	ListaServiceImpl listaServiceImpl;
	
	@GetMapping("/lista/create")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public Lista listarListas() {
//		return listaServiceImpl.findAll();
		return null;
	}
	
	@PostMapping("/lista/create")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public Lista crearLista(@RequestBody Lista lista) {
		return listaServiceImpl.crearLista(lista);
	}

}
