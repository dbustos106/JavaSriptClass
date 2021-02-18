const veterinarios = require("./rutas/veterinarios");

module.exports = {
    mascotas: [{ tipo: `Gato`, nombre: `Jass0`, dueno: `Julian` },
    { tipo: `Gato`, nombre: `Jass1`, dueno: `Julian` },
    { tipo: `Gato`, nombre: `Jass2`, dueno: `Julian` },
    { tipo: `Gato`, nombre: `Jass3`, dueno: `Julian` },
    { tipo: `Gato`, nombre: `Jass4`, dueno: `Julian` },
    { tipo: `Gato`, nombre: `Jass5`, dueno: `Julian` },
    { tipo: `Gato`, nombre: `Jass6`, dueno: `Julian` }
    ],
    veterinarios: [{ nombre: "Alexandra1", apellido: "perez1", documento: "234543" },
    { nombre: "Alexandra2", apellido: "perez2", documento: "234543" },
    { nombre: "Alexandra3", apellido: "perez3", documento: "234543" },
    { nombre: "Alexandra4", apellido: "perez4", documento: "234543" },
    ],
    duenos: [{ nombre: "Jorge0", apellido: "rojas0", documento: "234543" },
    { nombre: "Jorge1", apellido: "rojas1", documento: "234543" },
    { nombre: "Jorge2", apellido: "rojas2", documento: "234543" },
    { nombre: "Jorge3", apellido: "rojas3", documento: "234543" },
    ],
    consultas: [
        {
            mascota: 0, 
            veterinaria: 0,  
            fechaCreacion: new Date(), 
            fechaEdicion: new Date(), 
            historia: ``, 
            diagnostico: ``,
        }
    ]
}