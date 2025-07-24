package com.fasttask.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fasttask.dto.Test;

public interface ITestDAO extends JpaRepository<Test, Integer>{
	Test findByUsername(String username);
}
