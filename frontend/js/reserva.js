document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.querySelector("#tablaReservas");
    if (tabla) tabla.classList.add("table", "table-bordered", "table-hover", "align-middle", "table-success");

    cargarReservas();

    // Registrar reserva
    const btnRegistro = document.getElementById("btnGuardarRegistroReserva");
    if (btnRegistro) {
        btnRegistro.addEventListener("click", () => {
            const canchaNombre = document.getElementById("regCanchaNombre").value;
            const clienteNombre = document.getElementById("regClienteNombre").value;
            const fechaHoraInicio = document.getElementById("regFechaHora").value;
            if (!canchaNombre || !clienteNombre || !fechaHoraInicio) {
                alert("Complete todos los campos");
                return;
            }
            fetch("http://localhost:8080/api/reservas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ canchaNombre, clienteNombre, fechaHoraInicio })
            }).then(res => {
                if (res.ok) {
                    alert("Reserva registrada");
                    location.reload();
                } else alert("Error al registrar");
            });
        });
    }

    // Actualizar reserva
    const btnActualizar = document.getElementById("btnActualizarReserva");
    if (btnActualizar) {
        btnActualizar.addEventListener("click", () => {
            const id = document.getElementById("actReservaId").value;
            const canchaNombre = document.getElementById("actCanchaNombre").value;
            const clienteNombre = document.getElementById("actClienteNombre").value;
            const fechaHoraInicio = document.getElementById("actFechaHora").value;
            if (!id || !canchaNombre || !clienteNombre || !fechaHoraInicio) {
                alert("Complete los datos");
                return;
            }
            fetch(`http://localhost:8080/api/reservas/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ canchaNombre, clienteNombre, fechaHoraInicio })
            }).then(res => {
                if (res.ok) {
                    alert("Reserva actualizada");
                    location.reload();
                } else alert("Error al actualizar");
            });
        });
    }
});

function cargarReservas() {
    fetch("http://localhost:8080/api/reservas")
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("tablaReservas");
            tbody.innerHTML = "";
            data.forEach(reserva => {
                const fecha = new Date(reserva.fechaHoraInicio).toLocaleString();
                const fila = `
                    <tr>
                        <td>${reserva.id}</td>
                        <td>${reserva.canchaNombre}</td>
                        <td>${reserva.clienteNombre}</td>
                        <td>${fecha}</td>
                        <td>
                            <button class="btn btn-outline-primary btn-editar-reserva me-1" 
                                    data-id="${reserva.id}" 
                                    data-cancha="${reserva.canchaNombre}" 
                                    data-cliente="${reserva.clienteNombre}" 
                                    data-fecha="${reserva.fechaHoraInicio}">
                                <i class="fa-solid fa-pen-to-square"></i> Editar
                            </button>
                            <button class="btn btn-outline-danger btn-eliminar-reserva" data-id="${reserva.id}">
                                <i class="fa-solid fa-trash-can"></i> Eliminar
                            </button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += fila;
            });

            // Eventos editar
            document.querySelectorAll(".btn-editar-reserva").forEach(btn => {
                btn.addEventListener("click", () => {
                    document.getElementById("actReservaId").value = btn.dataset.id;
                    document.getElementById("actCanchaNombre").value = btn.dataset.cancha;
                    document.getElementById("actClienteNombre").value = btn.dataset.cliente;
                    // Convertir fecha a formato datetime-local (YYYY-MM-DDTHH:MM)
                    const fechaLocal = new Date(btn.dataset.fecha);
                    const year = fechaLocal.getFullYear();
                    const month = String(fechaLocal.getMonth() + 1).padStart(2, '0');
                    const day = String(fechaLocal.getDate()).padStart(2, '0');
                    const hours = String(fechaLocal.getHours()).padStart(2, '0');
                    const minutes = String(fechaLocal.getMinutes()).padStart(2, '0');
                    const fechaFormateada = `${year}-${month}-${day}T${hours}:${minutes}`;
                    document.getElementById("actFechaHora").value = fechaFormateada;
                    new bootstrap.Modal(document.getElementById("modalActualizarReserva")).show();
                });
            });

            // Eventos eliminar
            document.querySelectorAll(".btn-eliminar-reserva").forEach(btn => {
                btn.addEventListener("click", () => {
                    if (confirm("¿Eliminar reserva?")) {
                        fetch(`http://localhost:8080/api/reservas/${btn.dataset.id}`, { method: "DELETE" })
                            .then(res => { if (res.ok) location.reload(); else alert("Error"); });
                    }
                });
            });
        })
        .catch(error => console.error("Error cargando reservas:", error));
}