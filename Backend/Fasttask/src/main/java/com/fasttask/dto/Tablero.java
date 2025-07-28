package com.fasttask.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasttask.common.Views;

@Entity
@Table(name="tablero")
public class Tablero {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@JsonView(Views.Public.class)
	@Column(name="nombre", unique = true)
	private String nombre;
	
	
	@JsonView(Views.Public.class)
	@Column(name="usuario_fk")
	private Long usuarioFk;
	
//	@JsonView(Views.Public.class)
//	@Column(name="lista_fk")
//	private Long lista_fk;
//	
//	@JsonView(Views.Public.class)
//	@Column(name="task_fk")
//	private Long task_fk;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Long getUsuario_fk() {
		return usuarioFk;
	}

	public void setUsuario_fk(Long usuario_fk) {
		this.usuarioFk = usuario_fk;
	}




//	public Long getLista_fk() {
//		return lista_fk;
//	}
//
//	public void setLista_fk(Long lista_fk) {
//		this.lista_fk = lista_fk;
//	}
//
//	public Long getTask_fk() {
//		return task_fk;
//	}
//
//	public void setTask_fk(Long task_fk) {
//		this.task_fk = task_fk;
//	}
	
	
}
