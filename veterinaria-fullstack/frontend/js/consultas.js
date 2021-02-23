const listaConsultas = document.getElementById("lista-consultas");
const url = `http://localhost:5000/consultas`;

let consultas = []

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
        const respuesta = await fetch(url);
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

listarConsultas();