document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.querySelector("#tablaClientes");
    if (tabla) tabla.classList.add("table", "table-bordered", "table-hover", "align-middle", "table-success");

    cargarClientes();

    // Registrar cliente
    const btnRegistro = document.getElementById("btnGuardarRegistroCliente");
    if (btnRegistro) {
        btnRegistro.addEventListener("click", () => {
            const nombre = document.getElementById("regNombre").value;
            const telefono = document.getElementById("regTelefono").value;
            const email = document.getElementById("regEmail").value;
            if (!nombre || !email) {
                alert("Complete los campos obligatorios");
                return;
            }
            fetch("http://localhost:8080/api/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, telefono, email })
            }).then(res => {
                if (res.ok) {
                    alert("Cliente registrado");
                    location.reload();
                } else alert("Error al registrar");
            });
        });
    }

    // Actualizar cliente (el botón del modal)
    const btnActualizar = document.getElementById("btnActualizarCliente");
    if (btnActualizar) {
        btnActualizar.addEventListener("click", () => {
            const id = document.getElementById("actClienteId").value;
            const nombre = document.getElementById("actNombre").value;
            const telefono = document.getElementById("actTelefono").value;
            const email = document.getElementById("actEmail").value;
            if (!id || !nombre || !email) {
                alert("Complete los datos");
                return;
            }
            fetch(`http://localhost:8080/api/clientes/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, telefono, email })
            }).then(res => {
                if (res.ok) {
                    alert("Cliente actualizado");
                    location.reload();
                } else alert("Error al actualizar");
            });
        });
    }
});

function cargarClientes() {
    fetch("http://localhost:8080/api/clientes")
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("tablaClientes");
            tbody.innerHTML = "";
            data.forEach(cliente => {
                const fila = `
                    <tr>
                        <td>${cliente.id}</td>
                        <td>${cliente.nombre}</td>
                        <td>${cliente.telefono || ''}</td>
                        <td>${cliente.email}</td>
                        <td>
                            <button class="btn btn-outline-primary btn-editar-cliente me-1" 
                                    data-id="${cliente.id}" 
                                    data-nombre="${cliente.nombre}" 
                                    data-telefono="${cliente.telefono}" 
                                    data-email="${cliente.email}">
                                <i class="fa-solid fa-pen-to-square"></i> Editar
                            </button>
                            <button class="btn btn-outline-danger btn-eliminar-cliente" data-id="${cliente.id}">
                                <i class="fa-solid fa-trash-can"></i> Eliminar
                            </button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += fila;
            });

            // Eventos editar
            document.querySelectorAll(".btn-editar-cliente").forEach(btn => {
                btn.addEventListener("click", () => {
                    document.getElementById("actClienteId").value = btn.dataset.id;
                    document.getElementById("actNombre").value = btn.dataset.nombre;
                    document.getElementById("actTelefono").value = btn.dataset.telefono;
                    document.getElementById("actEmail").value = btn.dataset.email;
                    new bootstrap.Modal(document.getElementById("modalActualizarCliente")).show();
                });
            });

            // Eventos eliminar
            document.querySelectorAll(".btn-eliminar-cliente").forEach(btn => {
                btn.addEventListener("click", () => {
                    if (confirm("¿Eliminar cliente?")) {
                        fetch(`http://localhost:8080/api/clientes/${btn.dataset.id}`, { method: "DELETE" })
                            .then(res => { if (res.ok) location.reload(); else alert("Error"); });
                    }
                });
            });
        })
        .catch(error => console.error("Error cargando clientes:", error));
}