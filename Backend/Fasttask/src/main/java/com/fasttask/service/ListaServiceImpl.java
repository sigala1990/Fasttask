package com.fasttask.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasttask.DAO.IListaDAO;
import com.fasttask.config.EncoderConfig;
import com.fasttask.dto.Lista;

@Service
public class ListaServiceImpl implements IListaService {

    private final EncoderConfig encoderConfig;
	
	@Autowired
	IListaDAO iListaDAO;

    ListaServiceImpl(EncoderConfig encoderConfig) {
        this.encoderConfig = encoderConfig;
    }

	@Override
	public Lista crearLista(Lista lista) {
		Date fecha = new Date();
		lista.setFecha_creacion(fecha);
		lista.setFecha_modificacion(fecha);

		lista.setOrden(iListaDAO.findMaxOrdenByTableroFk(lista.getTableroFk()) + 1);
		return iListaDAO.save(lista);
	}

	@Override
	public List<Lista> listarListaByTablero(int id) {
		return iListaDAO.findByTableroFkOrderByOrdenAsc(id);
	}

	@Override
	public Lista listarListaById(int id) {
		return iListaDAO.findById(id);
	}

	@Override
	public Lista actualizarLista(Lista lista) {
		Date fecha = new Date();
		Lista listaEntera =iListaDAO.getById(lista.getId());
		listaEntera.setNombre(lista.getNombre());
		listaEntera.setFecha_modificacion(fecha);
		return iListaDAO.save(listaEntera);
	}

	@Override
	public void eliminarListaById(int id) {
		iListaDAO.deleteById(id);
	}

	@Override
	public int maxOrdenByTableroFk(int id) {
		return iListaDAO.findMaxOrdenByTableroFk(id);
	}

	@Override
	public void switchListas(int idTablero, int previousIndex, int currentIndex) {
		List<Lista> listas = iListaDAO.findByTableroFkOrderByOrdenAsc(idTablero);

		Lista listaMovida = listas.remove(previousIndex);
		listas.add(currentIndex, listaMovida);
		
		for (int i = 0; i < listas.size(); i++) {
			listas.get(i).setOrden(i);
			iListaDAO.save(listas.get(i));
		}
	}
	
	

}
