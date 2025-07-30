package com.fasttask.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasttask.DAO.IUserrDAO;
import com.fasttask.dto.Userr;

@Service
public class UserrServiceImpl implements IUserrService, UserDetailsService {
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	IUserrDAO iUserrDAO;
		
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Userr user = iUserrDAO.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException(username);
		}

		return new User(user.getUsername(), user.getPassword(), user.getAuthorities());
	}

	@Override
	public List<Userr> listarAllUserr() {
		return iUserrDAO.findAll();
	}

	@Override
	public Userr userrFindById(int id) {
		return iUserrDAO.getById(id);
	}
	
	@Override
	public Userr userrFindByUsername(String username) {
		return iUserrDAO.findByUsername(username);
	}

	@Override
	public Userr crearUser(Userr userr) {
		Date fecha = new Date(); 
		userr.setPassword(bCryptPasswordEncoder.encode(userr.getPassword()));
		userr.setRol(userr.getRol() != null && !userr.getRol().isEmpty() ? userr.getRol() : "USER" );
		userr.setFecha_creacion(fecha);
		iUserrDAO.save(userr);
		Userr nouUserr = iUserrDAO.findByUsername(userr.getUsername());
		return nouUserr;
	}

	@Override
	public boolean userrDuplicado(Userr userr) {
		boolean existEmail = iUserrDAO.existsByEmail(userr.getEmail());
		System.out.println("Email existe "+existEmail);
		boolean existUsername = iUserrDAO.existsByUsername(userr.getUsername());
		System.out.println("User existe "+ existUsername);
		return existEmail && existUsername ? true : false;		
	}



	
	
}
