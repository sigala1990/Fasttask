package com.fasttask.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasttask.DAO.IListaDAO;

@Service
public class ListaServiceImpl implements IListaService {
	
	@Autowired
	IListaDAO iListaDAO;
	

}
