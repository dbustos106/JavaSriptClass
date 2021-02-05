const listaUsuarios = document.getElementById("body-usuarios")
const boton = document.getElementById("boton");
const nombre = document.getElementById("nombre");
let usuarios = [];

function render() {
    const usuariosRender = usuarios
        .map(usuario => `<tr><td>${usuario.nombre}</tr></td>`)
        .join("");
    console.log(usuariosRender, "Impresion renderisada");
    listaUsuarios.innerHTML = usuariosRender;
}

function enviarDatos() {
    const datos = {nombre: nombre.value};
    fetch("https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios", {
        method: "POST", // or PUT
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(datos)
    })
    .then((response) =>  response.json())
    .then((datos) => {
        console.log("RespuestaJson: ", datos);
        refrescar();
    })
    .catch((error) => {
        console.error(error);
    });
    
}

function refrescar() {
    fetch("https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios")
    .then((response) =>  response.json())
    .then((resUsuarios) => {
        console.log("Respuesta usuarios: ", resUsuarios);
        usuarios = resUsuarios
        render();
    }) 
}

refrescar();

boton.onclick = enviarDatos;