const listaConsultas = document.getElementById("lista-consultas");
const mascota = document.getElementById("mascota");
const url = `http://localhost:5000`;

let consultas = []
let mascotas = []

/*
{
            mascota: 0, 
            veterinaria: 0,  
            fechaCreacion: new Date(), 
            fechaEdicion: new Date(), 
            historia: ``, 
            diagnostico: ``,
        }
*/

async function listarConsultas(){
    try {
        const respuesta = await fetch(`${url}/consultas`);
        const consultasDelServer = await respuesta.json();
        if(Array.isArray(consultasDelServer)){
            consultas = consultasDelServer;
        }
        if(consultas.length > 0){
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
                        <button type="button" class="btn btn-info">editar</button>
                    </div>
                </td>
                </tr> `
            }).join("");
            listaConsultas.innerHTML = renderConsultas;
        }
    } catch (error) {
        throw error;
    }
}

async function listarMascotas(){
    try {
        const respuesta = await fetch(`${url}/mascotas`);
        const mascotasDelServer = await respuesta.json();
        if(Array.isArray(mascotasDelServer)){
            mascotas = mascotasDelServer;
        }
        if(mascotas.length > 0){
            mascotas.forEach((mascotaActual, indice) => {
                const optionActual = document.createElement("option");
                optionActual.innerHTML = mascotaActual.nombre;
                optionActual.value = indice;
                mascota.appendChild(optionActual);
            });
            mascota.innerHTML += renderMascotas;
        }
    } catch (error) {
        throw error;
    }
}

listarMascotas();
listarConsultas();