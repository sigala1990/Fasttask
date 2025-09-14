package com.fasttask.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasttask.common.Views;

@Entity
@Table(name="lista")
public class Lista {

	@Id
	@JsonView(Views.Public.class)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@JsonView(Views.Public.class)
	@Column(name="nombre")
	private String nombre;
	
	@JsonView(Views.Public.class)
	@Column(name="tablero_fk")
	private int tableroFk;
		
	@JsonView(Views.Public.class)
	@Column(name="fecha_creacion")
	private Date fecha_creacion;
	
	@JsonView(Views.Public.class)
	@Column(name="fecha_modificacion")
	private Date fecha_modificacion;
	
	@JsonView(Views.Public.class)
	@Column(name="orden")
	private int orden;
	
	@OneToMany
	@JsonView(Views.Public.class)
	@JoinColumn(name="lista_fk")
	@OrderBy("orden ASC")
	private List<Task> tasks;

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


	public int getOrden() {
		return orden;
	}

	public void setOrden(int orden) {
		this.orden = orden;
	}

	public int getTableroFk() {
		return tableroFk;
	}

	public void setTableroFk(int tableroFk) {
		this.tableroFk = tableroFk;
	}

	public Date getFecha_creacion() {
		return fecha_creacion;
	}

	public void setFecha_creacion(Date fecha_creacion) {
		this.fecha_creacion = fecha_creacion;
	}

	public Date getFecha_modificacion() {
		return fecha_modificacion;
	}

	public void setFecha_modificacion(Date fecha_modificacion) {
		this.fecha_modificacion = fecha_modificacion;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}


	
}
