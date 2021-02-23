const listaduenos = document.getElementById("lista-duenos");
const documento = document.getElementById("documento");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const form = document.getElementById("form");
const indice = document.getElementById("indice");
const btnGuardar = document.getElementById("btn-guardar");
const url = `http://localhost:5000/duenos`;

let duenos = [];

async function listarduenos() {  // Mostrar duenos actualizadas
    try {
        const respuesta = await fetch(url);
        const duenosDelServer = await respuesta.json();
        if (Array.isArray(duenosDelServer)) {
            duenos = duenosDelServer;
        }
        if (duenos.length > 0) {
            const duenosRender = duenos.map((dueno, index) =>
                `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${dueno.documento}</td>
                    <td>${dueno.nombre}</td>
                    <td>${dueno.apellido}</td>
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
            listaduenos.innerHTML = duenosRender;
            Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
            Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
        } else {
            listaduenos.innerHTML = `<tr>
                <td colspan="5">No hay dueños</td>
            </tr>`;
        }
    } catch (error) {
        $(`.alert`).show(`show`);
    }
}

async function enviarDatos(evento) {  // Cuando le doy click al boton de envio del Modal
    evento.preventDefault();
    try {
        const datos = {
            documento: documento.value,
            nombre: nombre.value,
            apellido: apellido.value
        };
        var accion = btnGuardar.innerHTML;
        let metodo = "POST";
        let urlEnvio = url;
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
            listarduenos();
        }
    } catch (error) {
        $(`.alert`).show("show");
    }
}

function resetModal() {
    btnGuardar.innerText = `Crear`;
    documento.value = ``;
    nombre.value = ``;
    apellido.value = ``;
    indice.value = ``;
}
// CloSure -->
function editar(index) {  // Cuando le doy click al icono de Editar
    return function handler() {
        btnGuardar.innerText = `Editar`;
        $(`#exampleModal`).modal(`toggle`);
        const dueno = duenos[index];
        documento.value = dueno.documento;
        nombre.value = dueno.nombre;
        apellido.value = dueno.apellido;
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
                listarduenos();
            }
        } catch (error) {
            $(`.alert`).show("show");
        }
    }
}

listarduenos();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;