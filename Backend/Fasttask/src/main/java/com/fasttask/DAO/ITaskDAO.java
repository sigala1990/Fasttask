package com.fasttask.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fasttask.dto.Task;

public interface ITaskDAO extends JpaRepository<Task, Integer>{

	List<Task> findByListaFk(int id);
	Task findById(int id);
}
