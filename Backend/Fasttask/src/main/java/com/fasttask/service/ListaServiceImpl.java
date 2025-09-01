package com.fasttask.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasttask.DAO.IListaDAO;
import com.fasttask.dto.Lista;

@Service
public class ListaServiceImpl implements IListaService {
	
	@Autowired
	IListaDAO iListaDAO;

	@Override
	public Lista crearLista(Lista lista) {
		Date fecha = new Date();
		lista.setFecha_creacion(fecha);
		lista.setFecha_modificacion(fecha);
		return iListaDAO.save(lista);
	}

	@Override
	public List<Lista> listarListaByTablero(Long id) {
//		return iListaDAO.findByTableroFk(id);
		return null;
	}
	
	

}
