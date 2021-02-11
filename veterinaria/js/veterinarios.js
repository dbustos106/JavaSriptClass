const listaVeterinarios = document.getElementById("lista-veterinarios");
const pais = document.getElementById("pais");
const identificacion = document.getElementById("identificacion");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const form = document.getElementById("form");
const indiceActual = document.getElementById("indice");
const btnGuardar = document.getElementById("btn-guardar");

let veterinarios = [
    {
        pais: `Colombia`,
        identificacion: `1010234003`,
        nombre: `Julian`,
        apellido: `Bustos`
    },
    {
        pais: `Colombia`,
        identificacion: `101454003`,
        nombre: `Juan`,
        apellido: `Marin`
    }
];

function listarVeterinarios() {  // Mostrar veterinarios actualizadas
    const veterinariosRender = veterinarios.map((veterinario, index) =>
        `<tr>
            <th scope="row">${index + 1}</th>
            <td>${veterinario.pais}</td>
            <td>${veterinario.identificacion}</td>
            <td>${veterinario.nombre}</td>
            <td>${veterinario.apellido}</td>
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
    listaVeterinarios.innerHTML = veterinariosRender;
    Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
}

function enviarDatos(evento) {  // Cuando le doy click al boton de envio del Modal
    evento.preventDefault();
    const datos = {
        pais: pais.value,
        identificacion: identificacion.value,
        nombre: nombre.value,
        apellido: apellido.value
    };
    var accion = btnGuardar.innerHTML;
    switch (accion) {
        case `Editar`:
            veterinarios[indiceActual.value] = datos;
            break;
        case `Crear`:
            veterinarios.push(datos);
            break;
    }
    resetModal();
    listarVeterinarios();
}

function resetModal() {
    btnGuardar.innerText = `Crear`;
    pais.value = `País`;
    identificacion.value = ``;
    nombre.value = ``;
    apellido.value = ``;
    indiceActual.value = ``;
}
// CloSure -->
function editar(index) {  // Cuando le doy click al icono de Editar
    return function handler() {
        btnGuardar.innerText = `Editar`;
        $(`#exampleModal`).modal(`toggle`);
        console.log(veterinarios[index]);
        const veterinario = veterinarios[index];
        pais.value = veterinario.pais;
        identificacion.value = veterinario.identificacion;
        nombre.value = veterinario.nombre;
        apellido.value = veterinario.apellido;
        indiceActual.value = index;
    }
}
// Closure
function eliminar(index) {
    return function handler() {
        veterinarios = veterinarios.filter((veterinario, indiceVeterinario) => indiceVeterinario !== index);
        listarVeterinarios();
    }
}

listarVeterinarios();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;