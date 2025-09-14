package com.fasttask.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fasttask.dto.Lista;

public interface IListaDAO  extends JpaRepository<Lista, Integer>{
	
	List<Lista> findByTableroFkOrderByOrdenAsc(int id);
	Lista findById(int id);
	@Query("SELECT COALESCE(MAX(l.orden), 0) FROM Lista l WHERE l.tableroFk = :tableroId")
	int findMaxOrdenByTableroFk(@Param("tableroId") int tableroId);
	

}
