
# Sistema de Gestión de Reservas GoalZone Deportivo
Sistema web para el control de alquiler de canchas deportivas, gestión de clientes y reservas. Desarrollado como proyecto final del curso de Java Web en SENATI.

## Descripción del negocio
Nombre: GoalZone Deportivo  
Giro: Alquiler de canchas deportivas (fútbol, tenis, básquet, vóley, paddle, etc.)  
Tamaño: Pequeña empresa, operación local  
Contexto: Complejo deportivo que ofrece el alquiler de canchas por hora. Los clientes reservan por teléfono o en persona, y el dueño anotaba las reservas en cuadernos.  
Justificación: Se necesita un sistema digital para reemplazar el registro manual, evitar dobles reservas, controlar los pagos y tener un historial de clientes y reservas.

## Identificar el problema y solución
Problema: El dueño lleva el registro de canchas, clientes y reservas en hojas de cálculo o cuadernos, lo que genera dobles reservas, pérdida de información, dificultad para saber qué canchas están disponibles y qué clientes deben pagar.  
Solución tecnológica: Desarrollar un sistema web con Java Spring Boot y MySQL que permita registrar canchas, clientes y reservas, mostrando en todo momento la disponibilidad y el estado de pago.

## Requerimientos Funcionales
| Código | Descripción |
|--------|-------------|
| RF01 | El sistema debe permitir registrar una nueva cancha (nombre, precio por hora, estado) |
| RF02 | El sistema debe permitir registrar un nuevo cliente (nombre, teléfono, email) |
| RF03 | El sistema debe permitir registrar una nueva reserva (cancha, cliente, fecha y hora de inicio) |
| RF04 | El sistema debe mostrar el listado de canchas con su disponibilidad |
| RF05 | El sistema debe mostrar el listado de clientes registrados |
| RF06 | El sistema debe mostrar el listado de reservas con la cancha, cliente y horario |
| RF07 | El sistema debe permitir eliminar canchas, clientes y reservas |
| RF08 | El sistema debe permitir editar canchas (nombre, precio, estado) y clientes (nombre, teléfono, email) |

## Requerimientos No Funcionales

| Código | Tipo | Descripción |
|--------|------|-------------|
| RNF01 | Rendimiento | El sistema debe cargar cada pantalla en menos de 3 segundos |
| RNF02 | Usabilidad | La interfaz debe ser intuitiva y fácil de usar sin necesidad de capacitación previa |
| RNF03 | Seguridad | Solo usuarios autorizados podrán acceder al sistema mediante usuario y contraseña (opcional) |

## Tecnologías utilizadas
- Java 25
- Spring Boot 3
- MySQL 8
- HTML5, CSS3, JavaScript (Bootstrap 5, Font Awesome)
- IntelliJ IDEA
- XAMPP (MySQL)
- MySQL Workbench
- Git

---

## Base de datos

El sistema cuenta con **3 tablas** (cada una con máximo 4 atributos):

| Tabla | Descripción |
|-------|-------------|
| CANCHAS | Tipos de canchas deportivas disponibles |
| CLIENTES | Personas que realizan reservas |
| RESERVAS | Alquiler de una cancha por un cliente en una fecha y hora |

### Cardinalidades
- CLIENTE — RESERVA (1:N): Un cliente puede hacer muchas reservas, pero cada reserva pertenece a un solo cliente.
- CANCHA — RESERVA (1:N): Una cancha puede tener muchas reservas, pero cada reserva es para una sola cancha.

| Entidad A | Relación | Entidad B | Cardinalidad |
|-----------|----------|-----------|---------------|
| CLIENTE   | hace     | RESERVA   | 1:N |
| CANCHA    | tiene    | RESERVA   | 1:N |

### My sql = Base de datos

```sql
CREATE DATABASE IF NOT EXISTS goalzone_deportivo;
USE goalzone_deportivo;

CREATE TABLE canchas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    precio_hora DECIMAL(6,2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'disponible'
);

CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(80) NOT NULL,
    telefono VARCHAR(15),
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE reservas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cancha_nombre VARCHAR(50) NOT NULL,
    cliente_nombre VARCHAR(80) NOT NULL,
    fecha_hora_inicio DATETIME NOT NULL
);
``
application.properties

``
spring.application.name=goalzone_deportivo
spring.datasource.url=jdbc:mysql://localhost:3306/goalzone_deportivo
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
server.port=8080
``
