package com.fasttask.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fasttask.dto.Task;

public interface ITaskDAO extends JpaRepository<Task, Integer>{

	List<Task> findByListaFk(int id);
	Task findById(int id);
	@Query("SELECT COALESCE(MAX(l.orden), 0) FROM Task l WHERE l.listaFk = :listaId")
	int findMaxOrdenByListaFk(@Param("listaId") int listaId);
}
