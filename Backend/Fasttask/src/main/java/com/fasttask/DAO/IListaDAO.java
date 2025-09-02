package com.fasttask.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fasttask.dto.Lista;

public interface IListaDAO  extends JpaRepository<Lista, Integer>{
	
	List<Lista> findByTableroFk(int id);
	Lista findById(int id);
	

}
