const listaUsuarios = document.getElementById("body-usuarios")
const boton = document.getElementById("boton");
const limpiar = document.getElementById("limpiar");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const pais = document.getElementById("pais");
const indice = document.getElementById("indice");
let usuarios = [];
let botonesEliminar = null;
let botonesEditar = null;

function render() {
    const usuariosRender = usuarios
        .map((usuario, indice) => {
            return `<tr>
                        <td>${usuario.nombre ? usuario.nombre : 'vacio'}</td>
                        <td>${usuario.apellido ? usuario.apellido : 'vacio'}</td>
                        <td>${usuario.pais ? usuario.pais : 'vacio'}</td>
                        <td><button class="editar" data-indice=${indice}>editar</button></td>
                        <td><button class="eliminar" data-indice=${indice}>eliminar</button></td>
                        <td><a class="ver" href="/ajax/index21.html?usuario=${indice}">ver</a></td>
                    </tr>`
        })
        .join("");
    console.log(usuariosRender, "Impresion renderisada");
    listaUsuarios.innerHTML = usuariosRender;
    botonesEliminar = document.getElementsByClassName("eliminar");
    botonesEditar = document.getElementsByClassName("editar");
    Array.from(botonesEliminar).forEach(botonEliminar => {
        botonEliminar.onclick = eliminarUsuario;
    });
    Array.from(botonesEditar).forEach(botonEditar => {
        botonEditar.onclick = editarUsuario;
    });
}

function enviarDatos(event) {
    event.preventDefault();
    let accion = event.target.innerText;
    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value
    };
    let url = null;
    let method = null;
    if(accion == "crear"){
        url = "https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios";
        method = "POST";
    }else if(accion == "editar"){
        if(indice.value){
            url = `https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${indice.value}`;
            method = "PUT";
        }else{
            return;
        }
    }else{
        return;
    }
    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    .then((response) => response.json())
    .then((datos) => {
        console.log("RespuestaJson: ", datos);
        refrescar();
        restaurarBoton();
    })
    .catch((error) => {
        console.error(error);
        restaurarBoton();
    });
}

function eliminarUsuario(event) {
    event.preventDefault();
    console.log("eliminar un usuario: ", event);
    fetch(`https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${event.target.dataset.indice}`, {
        method: "DELETE"
    })
        .then((response) => response.json())
        .then((datos) => {
            console.log("RespuestaJson: ", datos);
            refrescar();
        });
}

function editarUsuario(event) {
    event.preventDefault();
    console.log("editar un usuario: ", event);
    if (event.target.dataset.indice) {
        const usuario = usuarios[event.target.dataset.indice]
        nombre.value = usuario.nombre ? usuario.nombre : "";
        apellido.value = usuario.apellido ? usuario.apellido : "";
        pais.value = usuario.pais ? usuario.pais : "";
        indice.value = event.target.dataset.indice;
        boton.innerText = "editar";
    }else{
        boton.innerText = "crear"
    }

    console.log("usuarios", usuario);

}
//CORS Evitar cargar contenido desde otros dominios ¡Toca activarlo!

function refrescar() {
    fetch("https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios")
        .then((response) => response.json())
        .then((resUsuarios) => {
            console.log("refrescar: ", resUsuarios);
            usuarios = resUsuarios
            render();
        })
}

function restaurarBoton(){
    boton.innerText = "crear";
    indice.value = '';
    nombre.value = '';
    apellido.value = '';
    pais.value = '';
}

refrescar();

boton.onclick = enviarDatos;
limpiar.onclick = restaurarBoton;