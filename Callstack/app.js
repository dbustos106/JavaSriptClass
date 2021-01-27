const obtenerNombre = () => "Julian";


const obtenerApellido = () => "Bustos";


function obtenerNombreCompleto(){
    const nombre = obtenerNombre();
    const apellido = obtenerApellido();
    return `${nombre} ${apellido}`
}

const nombreCompleto = obtenerNombreCompleto();

console.log("Nombre completo: ",nombreCompleto);