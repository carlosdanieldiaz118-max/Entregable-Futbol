document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.querySelector("#tablaCanchas");
    if (tabla) {
        tabla.classList.add("table", "table-bordered", "table-hover", "align-middle", "table-success");
    }

    // Cargar canchas desde el backend
    fetch("http://localhost:8080/api/canchas")
        .then(response => response.json())
        .then(data => {
            const elemento = document.getElementById("tablaCanchas");
            if (!elemento) return;
            elemento.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                let cancha = data[i];
                let estadoTexto = cancha.estado === "disponible" 
                    ? '<span style="color: #2d6a4f; font-weight: 500;">Disponible</span>' 
                    : '<span style="color: #b91c1c; font-weight: 500;">Mantenimiento</span>';
                let fila = `
                    <tr>
                        <td>${cancha.id}</td>
                        <td>${cancha.nombre}</td>
                        <td>S/ ${cancha.precioHora}</td>
                        <td>${estadoTexto}</td>
                        <td>
                            <button class="btn btn-outline-primary btn-editar-canchas me-1" 
                                    data-id="${cancha.id}" 
                                    data-nombre="${cancha.nombre}" 
                                    data-precio="${cancha.precioHora}" 
                                    data-estado="${cancha.estado}">
                                <i class="fa-solid fa-pen-to-square"></i> Editar
                            </button>
                            <button class="btn btn-outline-danger btn-eliminar-canchas" data-id="${cancha.id}">
                                <i class="fa-solid fa-trash-can"></i> Eliminar
                            </button>
                        </td>
                    </tr>
                `;
                elemento.innerHTML += fila;
            }

            // Asignar eventos a los botones "Editar" después de cargar la tabla
            document.querySelectorAll(".btn-editar-canchas").forEach(btn => {
                btn.addEventListener("click", () => {
                    // Llenar el modal de actualización con los datos de la cancha
                    document.getElementById("actualizarId").value = btn.dataset.id;
                    document.getElementById("actualizarNombre").value = btn.dataset.nombre;
                    document.getElementById("actualizarPrecio").value = btn.dataset.precio;
                    document.getElementById("actualizarEstado").value = btn.dataset.estado;
                    // Mostrar el modal
                    new bootstrap.Modal(document.getElementById("modalActualizarCancha")).show();
                });
            });
        })
        .catch(error => console.error("Error al cargar canchas:", error));

    // === REGISTRAR NUEVA CANCHA (POST) ===
    const btnGuardarRegistro = document.getElementById("btnGuardarRegistro");
    if (btnGuardarRegistro) {
        btnGuardarRegistro.addEventListener("click", () => {
            const nombre = document.getElementById("registroNombre").value;
            const precioHora = parseFloat(document.getElementById("registroPrecio").value);
            const estado = document.getElementById("registroEstado").value;

            if (!nombre || isNaN(precioHora)) {
                alert("Complete todos los campos correctamente");
                return;
            }

            fetch("http://localhost:8080/api/canchas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, precioHora, estado })
            })
            .then(response => {
                if (response.ok) {
                    alert("Cancha registrada correctamente");
                    location.reload();
                } else {
                    alert("Error al registrar la cancha");
                }
            })
            .catch(error => console.error("Error en POST:", error));
        });
    }

    // === ACTUALIZAR CANCHA (PUT) ===
    const btnActualizarCambios = document.getElementById("btnActualizarCambios");
    if (btnActualizarCambios) {
        btnActualizarCambios.addEventListener("click", () => {
            const id = document.getElementById("actualizarId").value;
            const nombre = document.getElementById("actualizarNombre").value;
            const precioHora = parseFloat(document.getElementById("actualizarPrecio").value);
            const estado = document.getElementById("actualizarEstado").value;

            if (!id || !nombre || isNaN(precioHora)) {
                alert("Complete todos los campos correctamente");
                return;
            }

            fetch(`http://localhost:8080/api/canchas/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, precioHora, estado })
            })
            .then(response => {
                if (response.ok) {
                    alert("Cancha actualizada correctamente");
                    location.reload();
                } else {
                    alert("Error al actualizar la cancha");
                }
            })
            .catch(error => console.error("Error en PUT:", error));
        });
    }
});

// === ELIMINAR CANCHA (DELETE) ===
document.addEventListener("click", function(e) {
    const btnEliminar = e.target.closest(".btn-eliminar-canchas");
    if (btnEliminar) {
        const id = btnEliminar.getAttribute("data-id");
        if (confirm("¿Eliminar esta cancha?")) {
            fetch(`http://localhost:8080/api/canchas/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    alert("Cancha eliminada correctamente");
                    location.reload();
                } else {
                    alert("Error al eliminar la cancha");
                }
            })
            .catch(error => console.error("Error en DELETE:", error));
        }
    }
});