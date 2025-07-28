package com.fasttask.service;

import java.util.List;

import com.fasttask.dto.Tablero;

public interface ITableroService {

	public List<Tablero> listarTableroXUserr(Long id);
}
