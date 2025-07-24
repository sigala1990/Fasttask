package com.fasttask.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fasttask.DAO.ITestDAO;
import com.fasttask.dto.Test;

@Service
public class TestServiceImpl implements ITestService, UserDetailsService {
	
	@Autowired
	ITestDAO iTestDAO;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Test test = iTestDAO.findByUsername(username);
		if (test == null) {
			throw new UsernameNotFoundException(username);
		}

		return new User(test.getUsername(), test.getPassword(), test.getAuthorities());
	}

	@Override
	public List<Test> listarTest() {
		return iTestDAO.findAll();
	}
}
