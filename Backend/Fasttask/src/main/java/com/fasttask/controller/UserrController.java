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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasttask.DAO.IUserrDAO;
import com.fasttask.common.Views;
import com.fasttask.dto.Userr;
import com.fasttask.service.UserrServiceImpl;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.DELETE })
public class UserrController {

//	private IUserrDAO userrDAO;

	@Autowired
	UserrServiceImpl userrServiceImpl;

	@GetMapping("/userr")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public List<Userr> listarll_tb_usuarios() {
		return userrServiceImpl.listarAllUserr();
	}

	@GetMapping("/userr/by_username/{username}")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public Userr userrXID(@PathVariable String username) {
		return userrServiceImpl.userrFindByUsername(username);
	}

	@GetMapping("/userr/by_id/{id}")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public Userr userXID(@PathVariable Integer id) {
		return userrServiceImpl.userrFindById(id);
	}

	@PostMapping("/userr/create")
	@JsonView(Views.Public.class)
	@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
	public ResponseEntity<?> crearUserr(@RequestBody Userr userr) {
		if (userrServiceImpl.userrDuplicado(userr)) {
			return ResponseEntity.status(409) // 409 Conflict
					.body("El usuario o el email ya existe");
		} else {
			Userr nuevoUsuario = userrServiceImpl.crearUser(userr);
			return ResponseEntity.status(201).body(nuevoUsuario);// 201 Creado registro correctamente
		}

	}
}
