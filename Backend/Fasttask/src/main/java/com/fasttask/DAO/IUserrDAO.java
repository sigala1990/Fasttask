package com.fasttask.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fasttask.dto.Userr;

public interface IUserrDAO extends JpaRepository<Userr, Integer>{
	Userr findByUsername(String username);
}
