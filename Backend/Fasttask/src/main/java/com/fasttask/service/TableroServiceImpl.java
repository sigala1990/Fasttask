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
	public List<Tablero> listarTableroXUserr(Long id) {
		// TODO Auto-generated method stub
		return iTableroDAO.findByUsuarioFk(id);
	}
	
	
	
	
}
