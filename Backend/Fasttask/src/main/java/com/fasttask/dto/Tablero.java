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
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasttask.common.Views;

@Entity
@Table(name="tablero")
public class Tablero {

	@Id
	@JsonView(Views.Public.class)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@JsonView(Views.Public.class)
	@Column(name="nombre", unique = true)
	private String nombre;
	
	@JsonView(Views.Public.class)
	@Column(name="usuario_fk")
	private int usuarioFk;
	
	@JsonView(Views.Public.class)
	@Column(name="imagen")
	private String imagen;
	
	@JsonView(Views.Public.class)
	@Column(name="fecha_creacion")
	private Date fecha_creacion;
	
	@JsonView(Views.Public.class)
	@Column(name="fecha_modificacion")
	private Date fecha_modificacion;

	@OneToMany
	@JsonView(Views.Public.class)
	@JoinColumn(name="tablero_fk")
	private List<Lista> listas;
	

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

	public int getUsuarioFk() {
		return usuarioFk;
	}

	public void setUsuarioFk(int usuarioFk) {
		this.usuarioFk = usuarioFk;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
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

	public List<Lista> getId_tablero() {
		return listas;
	}

	public void setId_tablero(List<Lista> id_tablero) {
		this.listas = id_tablero;
	}

	@Override
	public String toString() {
		return "Tablero [id=" + id + ", nombre=" + nombre + ", usuarioFk=" + usuarioFk + ", imagen=" + imagen
				+ ", fecha_creacion=" + fecha_creacion + ", fecha_modificacion=" + fecha_modificacion + ", id_tablero="
				+ listas + "]";
	}



	
}
