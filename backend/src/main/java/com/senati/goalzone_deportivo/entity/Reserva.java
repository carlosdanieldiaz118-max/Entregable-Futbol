package com.senati.goalzone_deportivo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservas")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "cancha_nombre", nullable = false, length = 50)
    private String canchaNombre;

    @Column(name = "cliente_nombre", nullable = false, length = 80)
    private String clienteNombre;

    @Column(name = "fecha_hora_inicio", nullable = false)
    private LocalDateTime fechaHoraInicio;

    public Reserva() {}

    public Reserva(String canchaNombre, String clienteNombre, LocalDateTime fechaHoraInicio) {
        this.canchaNombre = canchaNombre;
        this.clienteNombre = clienteNombre;
        this.fechaHoraInicio = fechaHoraInicio;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCanchaNombre() { return canchaNombre; }
    public void setCanchaNombre(String canchaNombre) { this.canchaNombre = canchaNombre; }
    public String getClienteNombre() { return clienteNombre; }
    public void setClienteNombre(String clienteNombre) { this.clienteNombre = clienteNombre; }
    public LocalDateTime getFechaHoraInicio() { return fechaHoraInicio; }
    public void setFechaHoraInicio(LocalDateTime fechaHoraInicio) { this.fechaHoraInicio = fechaHoraInicio; }
}