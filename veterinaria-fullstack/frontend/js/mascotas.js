const listaMascotas = document.getElementById("lista-mascotas");
const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const dueno = document.getElementById("dueno");
const form = document.getElementById("form");
const indice = document.getElementById("indice");
const btnGuardar = document.getElementById("btn-guardar");
const url = `http://localhost:5000/mascotas`;

let mascotas = [];

async function listarMascotas() {  // Mostrar mascotas actualizadas
    try {
        const respuesta = await fetch(url);
        const mascotasDelServer = await respuesta.json();
        if (Array.isArray(mascotasDelServer)) {
            mascotas = mascotasDelServer;
        }
        if(mascotas.length > 0){
            const mascotasRender = mascotas.map((mascota, index) =>
                `<tr>
                <th scope="row">${index + 1}</th>
                <td>${mascota.tipo}</td>
                <td>${mascota.nombre}</td>
                <td>${mascota.dueno}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">` +
                //<button type="button" class="btn btn-info editar" data-indice=${index} onclick=editar(this)><i class="fas fa-edit"></i></button>
                //<button type="button" class="btn btn-info editar" onclick=editar(${index})><i class="fas fa-edit"></i></button>
                //<button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></button>
                `<button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                        <button type="button" class="btn btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            </tr>`
            ).join("");
            listaMascotas.innerHTML = mascotasRender;
            Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
            Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
        }else{
            listaMascotas.innerHTML = `<tr>
                <td colspan="5">No hay mascotas</td>
                </tr>`;
        }
    } catch (error) {
        $(`.alert`).show("show");
    }
}

async function enviarDatos(evento) {  // Cuando le doy click al boton de envio del Modal
    evento.preventDefault();
    try {
        const datos = {
            tipo: tipo.value,
            nombre: nombre.value,
            dueno: dueno.value
        };
        let metodo = "POST";
        let urlEnvio = url;
        var accion = btnGuardar.innerHTML;
        if (accion === `Editar`) {
            mascotas[indice.value] = datos;
            urlEnvio = `${url}/${indice.value}`
            metodo = "PUT";
        }//coment
        const respuesta = await fetch(urlEnvio, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
        if (respuesta.ok) {
            resetModal();
            listarMascotas();
        }
    } catch (error) {
        $(`.alert`).show("show");
    }
}

function resetModal() {
    btnGuardar.innerText = `Crear`;
    tipo.value = `Tipo de animal`;
    nombre.value = ``;
    dueno.value = `Dueño`;
    indice.value = ``;
}
// CloSure -->
function editar(index) {  // Cuando le doy click al icono de Editar
    return function handler() {
        btnGuardar.innerText = `Editar`;
        $(`#exampleModal`).modal(`toggle`);
        const mascota = mascotas[index];
        tipo.value = mascota.tipo;
        nombre.value = mascota.nombre;
        dueno.value = mascota.dueno;
        indice.value = index;
    }
}
// Closure
function eliminar(index) {
    const urlEnvio = `${url}/${index}`
    return async function handler() {
        try {
            const respuesta = await fetch(urlEnvio, {
                method: `DELETE`,
            });
            if (respuesta.ok) {
                resetModal();
                listarMascotas();
            }
        } catch (error) {
            $(`.alert`).show("show");
        }
    }
}

listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;