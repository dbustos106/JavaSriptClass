let usuario = {};
const listaUsuario = document.getElementById("body-usuario");

function tomarIndice(){
    return indiceUsuario = location.search.replace("?","").split("=")[1];
}

function obtenerUsuario() {
    fetch(`https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${tomarIndice()}`)
        .then((response) => response.json())
        .then((resUsuario) => {
            console.log("refrescar: ", resUsuario);
            usuario = resUsuario
            render();
        })
}

function render(){
    const usuarioRender = `<tr><td class="campo-usuario">Nombre</td><td>${usuario.nombre ? usuario.nombre : 'vacio'}</td></tr>
                           <tr><td class="campo-usuario">Apellido</td><td>${usuario.apellido ? usuario.apellido : 'vacio'}</td></tr>
                           <tr><td class="campo-usuario">Apellido</td><td>${usuario.pais ? usuario.pais : 'vacio'}</td></tr>
                           </tr>`  
    console.log(usuarioRender, "Impresion renderisada");
    listaUsuario.innerHTML = usuarioRender;
}

obtenerUsuario();