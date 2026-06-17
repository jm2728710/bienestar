document.addEventListener("DOMContentLoaded", function () {
    
    const botonesAgendar = document.querySelectorAll(".btn-agendar-servicio");
    
    botonesAgendar.forEach(boton => {
        boton.addEventListener("click", function () {
            // Obtenemos el contenedor de la tarjeta para extraer el nombre exacto de la especialidad
            const tarjeta = this.closest(".info-card");
            const especialidad = tarjeta ? tarjeta.querySelector("h3").innerText : "la especialidad seleccionada";
            
            // Mensaje de alerta al usuario
            alert(`¡Gracias por tu interés! Te estamos redirigiendo a la sección de Contacto para gestionar tu cita en ${especialidad}.`);
            
            // Redirección automática a la página de contacto dentro de la misma carpeta components/
            window.location.href = "contacto.html";
        });
    });

    const tablaMedicos = document.getElementById("dynamicDoctorsTable");

    if (tablaMedicos) {
        // Estructura de datos requerida: Nombre, Especialidad y Días de atención
        const medicos = [
            { nombre: "Dr. Carlos Mendoza", especialidad: "Cardiología", dias: "Lunes, Miércoles y Viernes" },
            { nombre: "Dra. Ana López", especialidad: "Pediatría", dias: "Martes y Jueves" },
            { nombre: "Dr. Luis Gómez", especialidad: "Traumatología", dias: "Lunes a Viernes" },
            { nombre: "Dra. Elena Rostova", especialidad: "Dermatología", dias: "Sábados" },
            { nombre: "Dr. Patricio Estrella", especialidad: "Medicina General", dias: "Lunes a Sábado" }
        ];

        // Limpiamos la tabla por si acaso
        tablaMedicos.innerHTML = "";

        // Insertamos cada fila dinámicamente con Bootstrap
        medicos.forEach(medico => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="fw-semibold text-secondary ps-4">${medico.nombre}</td>
                <td><span class="badge" style="background-color: #003B73 !important;">${medico.especialidad}</span></td>
                <td class="pe-4"><strong class="text-dark">${medico.dias}</strong></td>
            `;
            tablaMedicos.appendChild(fila);
        });
    }
    const appointmentForm = document.getElementById("appointmentForm");
    
    if (appointmentForm) {
        appointmentForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const nameInput = document.getElementById("inputName");
            const emailInput = document.getElementById("inputEmail");
            const specialtySelect = document.getElementById("selectSpecialty");
            let isValid = true;

            // Validar Nombre
            if (nameInput.value.trim() === "") { 
                nameInput.classList.add("is-invalid"); 
                isValid = false; 
            } else { 
                nameInput.classList.remove("is-invalid"); 
                nameInput.classList.add("is-valid"); 
            }

            // Validar Email con Expresión Regular
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) { 
                emailInput.classList.add("is-invalid"); 
                isValid = false; 
            } else { 
                emailInput.classList.remove("is-invalid"); 
                emailInput.classList.add("is-valid"); 
            }

            // Validar Selector de Especialidad
            if (specialtySelect.value === "") { 
                specialtySelect.classList.add("is-invalid"); 
                isValid = false; 
            } else { 
                specialtySelect.classList.remove("is-invalid"); 
                specialtySelect.classList.add("is-valid"); 
            }

            // Si todo está correcto
            if (isValid) {
                alert(`¡Cita solicitada con éxito!\nPaciente: ${nameInput.value.trim()}`);
                
                // Resetear Formulario
                appointmentForm.reset();
                nameInput.classList.remove("is-valid");
                emailInput.classList.remove("is-valid");
                specialtySelect.classList.remove("is-valid");

                // Cerrar el Modal de Bootstrap de forma limpia
                const modalElement = document.getElementById('appointmentModal');
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        });
    }

   const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                const nombre = document.getElementById("contactName").value;
                alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado con éxito. Nos comunicaremos contigo a la brevedad.`);
                contactForm.reset();
                contactForm.classList.remove("was-validated");
                return;
            }
            contactForm.classList.add("was-validated");
        }, false);
    }
});
const medicos = [
    { id: 1, nombre: "Dr. Carlos Mendoza", especialidad: "Cardiología", dias: "Lunes, Miércoles y Viernes" },
    { id: 2, nombre: "Dra. Ana López", especialidad: "Pediatría", dias: "Martes y Jueves" },
    { id: 3, nombre: "Dr. Luis Gómez", especialidad: "Traumatología", dias: "Lunes a Viernes" },
    { id: 4, nombre: "Dra. Elena Rostova", especialidad: "Dermatología", dias: "Sábados" },
    { id: 5, nombre: "Dr. Patricio Estrella", especialidad: "Medicina General", dias: "Lunes a Sábado" }
];
const tablaMedicos = document.getElementById("dynamicDoctorsTable");
const inputBuscador = document.getElementById("searchEspecialidad");

if (tablaMedicos) {
    // 1. Arreglo completo (Estructura de datos base)
    const medicos = [
        { nombre: "Dr. Carlos Mendoza", especialidad: "Cardiología", dias: "Lunes, Miércoles y Viernes" },
        { nombre: "Dra. Ana López", especialidad: "Pediatría", dias: "Martes y Jueves" },
        { nombre: "Dr. Luis Gómez", especialidad: "Traumatología", dias: "Lunes a Viernes" },
        { nombre: "Dra. Elena Rostova", especialidad: "Dermatología", dias: "Sábados" },
        { nombre: "Dr. Patricio Estrella", especialidad: "Medicina General", dias: "Lunes a Sábado" }
    ];

    // 2. Función encargada de renderizar las filas en el DOM
    function cargarTabla(listaMedicos) {
        // Limpiamos por completo el contenido previo de la tabla
        tablaMedicos.innerHTML = "";

        if (listaMedicos.length === 0) {
            tablaMedicos.innerHTML = `<tr><td colspan="3" class="text-center text-muted py-3">No se encontraron especialistas.</td></tr>`;
            return;
        }

        listaMedicos.forEach(medico => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="fw-semibold text-secondary ps-4">${medico.nombre}</td>
                <td><span class="badge" style="background-color: #003B73 !important;">${medico.especialidad}</span></td>
                <td class="pe-4"><strong class="text-dark">${medico.dias}</strong></td>
            `;
            tablaMedicos.appendChild(fila);
        });
    }

    cargarTabla(medicos);

    if (inputBuscador) {
        inputBuscador.addEventListener("input", function (event) {
            const textoBusqueda = event.target.value.toLowerCase().trim();

            // Filtrado dinámico utilizando programación funcional (.filter)
            const medicosFiltrados = medicos.filter(medico => {
                return medico.especialidad.toLowerCase().includes(textoBusqueda) || 
                       medico.nombre.toLowerCase().includes(textoBusqueda);
            });

            cargarTabla(medicosFiltrados);
        });
    }
}