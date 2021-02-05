const listaUsuarios = document.getElementById("lista-usuarios")
const boton = document.getElementById("boton");

function reqListener() {
    const usuarios = JSON.parse(this.responseText);
    console.log(usuarios, "Impresion sin renderisar");
    const usuariosRender = usuarios
        .map(usuario => `<li>${usuario.nombre}</li>`)
        .join("");
    console.log(usuariosRender, "Impresion renderisada");
    listaUsuarios.innerHTML = usuariosRender;
}

var peticion = new XMLHttpRequest();
peticion.addEventListener("load", reqListener);

function enviarDatos() {
    peticion.open(
        "POST",
        "https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios", 
        true
    );
    peticion.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded");
    peticion.send("nombre=Prueba32");
    setTimeout(refrescar, 3000);
}

function refrescar() {
    peticion.open("GET", "https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios");
    peticion.send();
}

boton.onclick = enviarDatos;