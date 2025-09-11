package com.fasttask.dto;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasttask.common.Views;

@Entity
@Table(name="task")
public class Task {

	@Id
	@JsonView(Views.Public.class)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@JsonView(Views.Public.class)
	@Column(name="nombre", unique = true)
	private String nombre;
	
	@JsonView(Views.Public.class)
	@Column(name="lista_fk")
	private int listaFk;
	
	@JsonView(Views.Public.class)
	@Column(name="descripcion")
	private String descripcion;
	
//	@JsonView(Views.Public.class)
//	@Column(name="completada",columnDefinition = "BOOLEAN DEFAULT false")
//	private boolean completada;
	@JsonView(Views.Public.class)
	@Column(name="completada")
	private int completada;
	
	@JsonView(Views.Public.class)
	@Column(name="orden")
	@OrderBy("orden ASC")
	private int orden;
	
	@JsonView(Views.Public.class)
	@Column(name="fecha_creacion")
	private Date fecha_creacion;
	
	@JsonView(Views.Public.class)
	@Column(name="fecha_modificacion")
	private Date fecha_modificacion;
	
	@JsonView(Views.Public.class)
	@Column(name="fecha_task_ini")
	private Date fecha_task_ini;
	
	@JsonView(Views.Public.class)
	@Column(name="fecha_task_fin")
	private Date fecha_task_fin;

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

	public int getListaFk() {
		return listaFk;
	}

	public void setListaFk(int listaFk) {
		this.listaFk = listaFk;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

//	public boolean isCompletada() {
//		return completada;
//	}
//
//	public void setCompletada(boolean completada) {
//		this.completada = completada;
//	}

	public Date getFecha_creacion() {
		return fecha_creacion;
	}

	public int getCompletada() {
		return completada;
	}

	public void setCompletada(int completada) {
		this.completada = completada;
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

	public Date getFecha_task_ini() {
		return fecha_task_ini;
	}

	public void setFecha_task_ini(Date fecha_task_ini) {
		this.fecha_task_ini = fecha_task_ini;
	}

	public Date getFecha_task_fin() {
		return fecha_task_fin;
	}

	public void setFecha_task_fin(Date fecha_task_fin) {
		this.fecha_task_fin = fecha_task_fin;
	}
	
	
}
