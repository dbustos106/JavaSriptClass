const listaMascotas = document.getElementById("lista-mascotas");
const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const dueno = document.getElementById("dueno");
const form = document.getElementById("form");
const indiceActual = document.getElementById("indice");
const btnGuardar = document.getElementById("btn-guardar");

let mascotas = [
    {
        tipo: `Gato`,
        nombre: `Manchas`,
        dueno: `Esteban`
    },
    {
        tipo: `Perro`,
        nombre: `Roqui`,
        dueno: `Julian`
    }
];

function listarMascotas() {  // Mostrar mascotas actualizadas
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
}

function enviarDatos(evento) {  // Cuando le doy click al boton de envio del Modal
    evento.preventDefault();
    const datos = {
        tipo: tipo.value,
        nombre: nombre.value,
        dueno: dueno.value
    };
    var accion = btnGuardar.innerHTML;
    switch (accion) {
        case `Editar`:
            mascotas[indiceActual.value] = datos;
            break;
        case `Crear`:
            mascotas.push(datos);
            break;
    }
    resetModal();
    listarMascotas();
}

function resetModal() {
    btnGuardar.innerText = `Crear`;
    tipo.value = `Tipo de animal`;
    nombre.value = ``;
    dueno.value = `Dueño`;
    indiceActual.value = ``;
}
// CloSure -->
function editar(index) {  // Cuando le doy click al icono de Editar
    return function handler() {
        btnGuardar.innerText = `Editar`;
        $(`#exampleModal`).modal(`toggle`);
        console.log(mascotas[index]);
        const mascota = mascotas[index];
        tipo.value = mascota.tipo;
        nombre.value = mascota.nombre;
        dueno.value = mascota.dueno;
        indiceActual.value = index;
    }
}
// Closure
function eliminar(index) {
    return function handler() {
        mascotas = mascotas.filter((mascota, indiceMascota) => indiceMascota !== index);
        listarMascotas();
    }
}

listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;