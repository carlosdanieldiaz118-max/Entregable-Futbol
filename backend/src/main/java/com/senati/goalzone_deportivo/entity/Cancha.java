package com.senati.goalzone_deportivo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "canchas")
public class Cancha {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Column(name = "precio_hora", nullable = false)
    private Double precioHora;

    @Column(nullable = false, length = 20)
    private String estado;

    public Cancha() {}

    public Cancha(String nombre, Double precioHora, String estado) {
        this.nombre = nombre;
        this.precioHora = precioHora;
        this.estado = estado;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Double getPrecioHora() { return precioHora; }
    public void setPrecioHora(Double precioHora) { this.precioHora = precioHora; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}