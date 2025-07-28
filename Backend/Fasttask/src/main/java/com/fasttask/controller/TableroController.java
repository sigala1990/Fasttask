package com.fasttask.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasttask.common.Views;
import com.fasttask.dto.Tablero;
import com.fasttask.service.TableroServiceImpl;

@RestController
@RequestMapping("/api")
public class TableroController {

	@Autowired
	TableroServiceImpl tableroServiceImpl;
	
	@GetMapping("/tablero/{idUserr}")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public List<Tablero> listar_tableros_xUserr(@PathVariable Long idUserr) {
		return tableroServiceImpl.listarTableroXUserr(idUserr);
	}
	
}
