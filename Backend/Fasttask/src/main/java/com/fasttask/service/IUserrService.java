package com.fasttask.service;

import java.util.List;

import com.fasttask.dto.Userr;

public interface IUserrService {
	public List<Userr> listarAllUserr();
	
	public Userr userrFindById(int id);
	public Userr userrFindByUsername(String username);
	public Userr crearUser(Userr user);
	public boolean userrDuplicado(Userr user);
}
