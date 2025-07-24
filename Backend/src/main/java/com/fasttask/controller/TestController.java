package com.fasttask.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import com.fasttask.DAO.ITestDAO;
import com.fasttask.dto.Test;
import com.fasttask.service.TestServiceImpl;

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.DELETE })
public class TestController {

	private ITestDAO testDAO;

	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public TestController(ITestDAO TestDAO, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.testDAO = TestDAO;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	@Autowired
	TestServiceImpl testServiceImpl;

	@GetMapping("/response-entity-builder-with-http-headers")
	public ResponseEntity<String> usingResponseEntityBuilderAndHttpHeaders() {
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set("Baeldung-Example-Header", "Value-ResponseEntityBuilderWithHttpHeaders");

		return ResponseEntity.ok().headers(responseHeaders).body("Response with header using ResponseEntity");
	}

	@GetMapping("/usuario")
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public List<Test> listarGcon_tb_usuarios() {
		return testServiceImpl.listarTest();
	}
}
