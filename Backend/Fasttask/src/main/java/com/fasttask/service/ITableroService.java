package com.fasttask.service;

import java.util.List;

import com.fasttask.dto.Tablero;

public interface ITableroService {

	public List<Tablero> listarTableroByUserr(Long id);
	public Tablero listarTableroById(int id);
	public Tablero guardarTablero(Tablero tablero);
}
