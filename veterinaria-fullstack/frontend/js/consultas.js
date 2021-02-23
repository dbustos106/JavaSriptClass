const listaConsultas = document.getElementById("lista-consultas");
const btnGuardar = document.getElementById("btn-guardar");
const mascota = document.getElementById("mascota");
const veterinario = document.getElementById("veterinario");
const historia = document.getElementById("historia");
const diagnostico = document.getElementById("diagnostico");
const indice = document.getElementById("indice");
const formulario = document.getElementById("formulario");
const url = `http://localhost:5000`;

let consultas = []
let mascotas = []

async function listarConsultas() {
    try {
        const respuesta = await fetch(`${url}/consultas`);
        const consultasDelServer = await respuesta.json();
        if (Array.isArray(consultasDelServer)) {
            consultas = consultasDelServer;
        }
        if (consultas.length > 0) {
            const renderConsultas = consultas.map((consulta, indice) => {
                return `<tr>
                <th scope="row">${indice}</th>
                <td>${consulta.mascota.nombre}</td>
                <td>${consulta.veterinario.nombre} ${consulta.veterinario.apellido}</td>
                <td>${consulta.diagnostico}</td>
                <td>${consulta.fechaCreacion}</td>
                <td>${consulta.fechaEdicion}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                    </div>
                </td>
                </tr> `
            }).join("");
            listaConsultas.innerHTML = renderConsultas;
            Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
        }
    } catch (error) {
        $(`.alert-danger`).show("show");
    }
}

async function listarMascotas() {
    try {
        const respuesta = await fetch(`${url}/mascotas`);
        const mascotasDelServer = await respuesta.json();
        if (Array.isArray(mascotasDelServer)) {
            mascotas = mascotasDelServer;
        }
        if (mascotas.length > 0) {
            mascotas.forEach((mascotaActual, indice) => {
                const optionActual = document.createElement("option");
                optionActual.innerHTML = mascotaActual.nombre;
                optionActual.value = indice;
                mascota.appendChild(optionActual);
            });
        }
    } catch (error) {
        $(`.alert-danger`).show("show");
    }
}

async function listarVeterinarios() {
    try {
        const respuesta = await fetch(`${url}/veterinarios`);
        const veterinariosDelServer = await respuesta.json();
        if (Array.isArray(veterinariosDelServer)) {
            veterinarios = veterinariosDelServer;
        }
        if (veterinarios.length > 0) {
            veterinarios.forEach((veterinarioActual, indice) => {
                const optionActual = document.createElement("option");
                optionActual.innerHTML = `${veterinarioActual.nombre} ${veterinarioActual.apellido}`;
                optionActual.value = indice;
                veterinario.appendChild(optionActual);
            });
        }
    } catch (error) {
        $(`.alert-danger`).show("show");
    }
}

async function enviarDatos(evento) {  // Cuando le doy click al boton de envio del Modal
    evento.preventDefault();
    try {
        const datos = {
            mascota: mascota.value,
            veterinario: veterinario.value,
            historia: historia.value,
            diagnostico: diagnostico.value
        };
        if (validar(datos) === true) {
            var accion = btnGuardar.innerHTML;
            let metodo = "POST";
            let urlEnvio = `${url}/consultas`;
            if (accion === `Editar`) {
                urlEnvio += `/${indice.value}`;
                metodo = "PUT";
            }
            const respuesta = await fetch(urlEnvio, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });
            if (respuesta.ok) {
                resetModal();
                listarConsultas();
            }
            formulario.classList.add("was-validated");
            return;
        }
        $(".alert-warning").show();
    } catch (error) {
        $(`.alert-danger`).show("show");
    }
}

function editar(index) {  // Cuando le doy click al icono de Editar
    return function handler() {
        btnGuardar.innerText = `Editar`;
        $(`#exampleModal`).modal(`toggle`);
        const consulta = consultas[index];
        mascota.value = consulta.mascota.id;
        veterinario.value = consulta.veterinario.id;
        historia.value = consulta.historia;
        diagnostico.value = consulta.diagnostico;
        indice.value = index;
    }
}

function resetModal() {
    btnGuardar.innerText = `Crear`;
    [mascota, veterinario, historia, diagnostico].forEach((inputActual) => {
        inputActual.value = "";
        inputActual.classList.remove("is-invalid");
        inputActual.classList.remove("is-valid");
    });
    $(".alert-warning").hide();
    $(`#exampleModal`).modal(`toggle`);  
}

function validar(datos) {
    if (typeof datos !== "object") {
        console.log(typeof datos);
        return false;
    }
    let respuesta = true;
    for (let clave in datos) {
        if (datos[clave].length === 0) {
            document.getElementById(clave).classList.add("is-invalid");
            respuesta = false;
        }else{
            document.getElementById(clave).classList.remove("is-invalid");
            document.getElementById(clave).classList.add("is-valid");
        }
    }
    if(respuesta === true){
        $(".alert-warning").hide();
    }
    return respuesta;
}

listarVeterinarios();
listarMascotas();
listarConsultas();

btnGuardar.onclick = enviarDatos;