package com.fasttask.service;

import java.util.List;

import com.fasttask.dto.Lista;

public interface IListaService {

	public Lista crearLista(Lista lista);
	public List<Lista> listarListaByTablero(int id);
	
}
