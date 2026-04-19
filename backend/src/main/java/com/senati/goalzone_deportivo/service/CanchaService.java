package com.senati.goalzone_deportivo.service;

import com.senati.goalzone_deportivo.entity.Cancha;
import com.senati.goalzone_deportivo.repository.CanchaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CanchaService {
    private final CanchaRepository canchaRepository;

    public CanchaService(CanchaRepository canchaRepository) {
        this.canchaRepository = canchaRepository;
    }

    public List<Cancha> listarTodas() {
        return canchaRepository.findAll();
    }

    public Cancha obtenerPorId(Long id) {
        return canchaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cancha no encontrada con id: " + id));
    }

    public Cancha crearCancha(Cancha cancha) {
        return canchaRepository.save(cancha);
    }

    public Cancha actualizarCancha(Long id, Cancha cancha) {
        cancha.setId(id);
        return canchaRepository.save(cancha);
    }

    public void eliminarCancha(Long id) {
        canchaRepository.deleteById(id);
    }
}