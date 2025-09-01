package com.fasttask.service;

import java.util.List;

import com.fasttask.dto.Tablero;

public interface ITableroService {

	public List<Tablero> listarTableroByUserr(int id);
	public Tablero listarTableroById(int id);
	public Tablero guardarTablero(Tablero tablero);
	public Tablero crearTablero(Tablero tablero);
}
