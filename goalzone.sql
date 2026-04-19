
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
    email VARCHAR(100) UNIQUE
);


CREATE TABLE reservas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cancha_nombre VARCHAR(50) NOT NULL,
    cliente_nombre VARCHAR(80) NOT NULL,
    fecha_hora_inicio DATETIME NOT NULL
);

INSERT INTO canchas (nombre, precio_hora, estado) VALUES
('Cancha Fútbol 1', 50.00, 'disponible'),
('Cancha Fútbol 2', 50.00, 'disponible'),
('Cancha Fútbol 3', 55.00, 'mantenimiento'),
('Cancha Tenis 1', 30.00, 'disponible'),
('Cancha Tenis 2', 30.00, 'disponible'),
('Cancha Básquet 1', 40.00, 'disponible'),
('Cancha Básquet 2', 40.00, 'mantenimiento'),
('Cancha Vóley 1', 35.00, 'disponible'),
('Cancha Vóley 2', 35.00, 'disponible'),
('Cancha Paddle 1', 45.00, 'disponible'),
('Cancha Paddle 2', 45.00, 'disponible'),
('Cancha Frontón 1', 25.00, 'disponible'),
('Cancha Frontón 2', 25.00, 'mantenimiento'),
('Cancha Fútbol Sala 1', 60.00, 'disponible'),
('Cancha Fútbol Sala 2', 60.00, 'disponible'),
('Cancha Béisbol 1', 70.00, 'disponible'),
('Cancha Rugby 1', 80.00, 'mantenimiento'),
('Cancha Golf 1', 100.00, 'disponible'),
('Cancha Squash 1', 40.00, 'disponible'),
('Cancha Squash 2', 40.00, 'disponible');

INSERT INTO clientes (nombre, telefono, email) VALUES
('Luis Ramírez', '987654321', 'luis.ramirez@email.com'),
('Ana Torres', '912345678', 'ana.torres@email.com'),
('Carlos Mendoza', '998877665', 'carlos.mendoza@email.com'),
('María Fernández', '955443322', 'maria.fernandez@email.com'),
('Jorge Sánchez', '966554433', 'jorge.sanchez@email.com'),
('Lucía Gómez', '977665544', 'lucia.gomez@email.com'),
('Pedro Quispe', '988776655', 'pedro.quispe@email.com'),
('Carmen Rojas', '944332211', 'carmen.rojas@email.com'),
('Andrés Herrera', '933221100', 'andres.herrera@email.com'),
('Valentina Díaz', '922110099', 'valentina.diaz@email.com'),
('Ricardo Paredes', '911009988', 'ricardo.paredes@email.com'),
('Sofía Castillo', '900998877', 'sofia.castillo@email.com'),
('Fernando León', '987123456', 'fernando.leon@email.com'),
('Isabel Cáceres', '976543210', 'isabel.caceres@email.com'),
('Raúl Espinoza', '965432109', 'raul.espinoza@email.com'),
('Patricia Vega', '954321098', 'patricia.vega@email.com'),
('Eduardo Ríos', '943210987', 'eduardo.rios@email.com'),
('Mónica Flores', '932109876', 'monica.flores@email.com'),
('Gustavo Luna', '921098765', 'gustavo.luna@email.com'),
('Daniela Cruz', '910987654', 'daniela.cruz@email.com');

INSERT INTO reservas (cancha_nombre, cliente_nombre, fecha_hora_inicio) VALUES
('Cancha Fútbol 1', 'Luis Ramírez', '2025-05-10 15:00:00'),
('Cancha Tenis 1', 'Ana Torres', '2025-05-11 10:30:00'),
('Cancha Básquet 1', 'Carlos Mendoza', '2025-05-12 18:00:00'),
('Cancha Vóley 1', 'María Fernández', '2025-05-13 16:00:00'),
('Cancha Paddle 1', 'Jorge Sánchez', '2025-05-14 12:00:00'),
('Cancha Fútbol 2', 'Lucía Gómez', '2025-05-15 14:30:00'),
('Cancha Tenis 2', 'Pedro Quispe', '2025-05-16 09:00:00'),
('Cancha Básquet 2', 'Carmen Rojas', '2025-05-17 19:00:00'),
('Cancha Vóley 2', 'Andrés Herrera', '2025-05-18 17:00:00'),
('Cancha Paddle 2', 'Valentina Díaz', '2025-05-19 11:00:00'),
('Cancha Fútbol 3', 'Ricardo Paredes', '2025-05-20 20:00:00'),
('Cancha Frontón 1', 'Sofía Castillo', '2025-05-21 08:30:00'),
('Cancha Fútbol Sala 1', 'Fernando León', '2025-05-22 13:00:00'),
('Cancha Béisbol 1', 'Isabel Cáceres', '2025-05-23 15:30:00'),
('Cancha Golf 1', 'Raúl Espinoza', '2025-05-24 10:00:00'),
('Cancha Squash 1', 'Patricia Vega', '2025-05-25 18:30:00'),
('Cancha Fútbol 1', 'Eduardo Ríos', '2025-05-26 12:00:00'),
('Cancha Tenis 1', 'Mónica Flores', '2025-05-27 14:00:00'),
('Cancha Básquet 1', 'Gustavo Luna', '2025-05-28 16:30:00'),
('Cancha Vóley 1', 'Daniela Cruz', '2025-05-29 19:30:00');

