package com.fasttask.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fasttask.dto.Tablero;

public interface ITableroDAO extends JpaRepository<Tablero, Integer> {
	
	List<Tablero> findByUsuarioFk(Long id);
	Tablero findById(int id);
}
