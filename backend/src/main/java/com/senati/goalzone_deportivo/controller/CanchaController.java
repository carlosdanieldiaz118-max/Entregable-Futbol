package com.senati.goalzone_deportivo.controller;

import com.senati.goalzone_deportivo.entity.Cancha;
import com.senati.goalzone_deportivo.service.CanchaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/canchas")
@CrossOrigin(origins = "*")
public class CanchaController {
    private final CanchaService canchaService;

    public CanchaController(CanchaService canchaService) {
        this.canchaService = canchaService;
    }

    @GetMapping
    public List<Cancha> listar() {
        return canchaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cancha> obtener(@PathVariable Long id) {
        Cancha cancha = canchaService.obtenerPorId(id);
        return ResponseEntity.ok(cancha);
    }

    @PostMapping
    public ResponseEntity<Cancha> crear(@RequestBody Cancha cancha) {
        Cancha nueva = canchaService.crearCancha(cancha);
        return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cancha> actualizar(@PathVariable Long id, @RequestBody Cancha cancha) {
        Cancha actualizada = canchaService.actualizarCancha(id, cancha);
        return ResponseEntity.ok(actualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        canchaService.eliminarCancha(id);
        return ResponseEntity.noContent().build();
    }
}