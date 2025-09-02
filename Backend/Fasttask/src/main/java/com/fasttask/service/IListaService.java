package com.fasttask.service;

import java.util.List;

import com.fasttask.dto.Lista;

public interface IListaService {

	public Lista listarListaById(int id);
	public List<Lista> listarListaByTablero(int id);
	public Lista crearLista(Lista lista);
	public Lista actualizarLista(Lista lista);
	public void eliminarListaById(int id);
	
	
}
