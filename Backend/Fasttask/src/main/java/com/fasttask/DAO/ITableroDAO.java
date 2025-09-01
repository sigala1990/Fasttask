package com.fasttask.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fasttask.dto.Tablero;

public interface ITableroDAO extends JpaRepository<Tablero, Integer> {
	
	List<Tablero> findByUsuarioFk(int id);
	Tablero findById(int id);
	
//	@Query("SELECT COALESCE(MAX(t.id), 0) FROM Tablero t WHERE t.usuarioFk = :usuarioFk")
//	int findMaxIdTableroByUsuarioFk(@Param("usuarioFk") Long usuarioFk);
}
