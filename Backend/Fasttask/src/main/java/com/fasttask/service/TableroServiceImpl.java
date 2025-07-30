package com.fasttask.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasttask.DAO.ITableroDAO;
import com.fasttask.dto.Tablero;

@Service
public class TableroServiceImpl implements ITableroService {

	@Autowired
	ITableroDAO iTableroDAO;

	@Override
	public List<Tablero> listarTableroByUserr(Long id) {
		return iTableroDAO.findByUsuarioFk(id);
	}
	
	@Override
	public Tablero listarTableroById(int id) {
		return iTableroDAO.findById(id);
	}

	@Override
	public Tablero guardarTablero(Tablero tablero) {
		iTableroDAO.save(tablero);
		return listarTableroById(tablero.getId());
	}
	
	
	
	
}
