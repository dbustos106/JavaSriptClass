const recursos = require("./recursos");
const mascotas = require("./rutas/mascotas");
const veterinarios = require("./rutas/veterinarios");
const duenos = require("./rutas/duenos");
const consultas = require("./rutas/consultas");

module.exports = {
    ruta: (_data, callback) => {  //handler
        callback(200, { mensaje: `Esta es /ruta` });
    },
    mascotas: mascotas(recursos.mascotas),
    veterinarios: veterinarios(recursos.veterinarios),
    duenos: duenos(recursos.duenos),
    consultas: consultas(recursos),
    noEncontrado: (_data, callback) => {
        callback(404, { mensaje: `No encontrado` });
    },
}