const listaMascotas = document.getElementById("lista-mascotas");
const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const dueno = document.getElementById("dueno");


let mascotas = [
    {
        tipo: "Gato",
        nombre: "Manchas",
        dueno: "esteban"
    }
];

function listarMascotas () {
    const mascotasRender = mascotas.map((mascota, indice) =>
        `<tr>
            <th scope="row">${indice + 1}</th>
            <td>${mascota.tipo}</td>
            <td>${mascota.nombre}</td>
            <td>${mascota.dueno}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                </div>
            </td>
        </tr>`
    ).join("");
    listaMascotas.innerHTML = mascotasRender;
}

listarMascotas();