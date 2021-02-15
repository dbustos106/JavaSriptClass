module.exports = {
    ruta: (data, callback) => {  //handler
        callback(200, { mensaje: `Esta es /ruta` });
    },
    mascotas: {
        get: (data, callback) => {  //handler
            if (typeof data.indice != `undefined`) {
                if (global.recursos.mascotas[data.indice]) {
                    return callback(200, global.recursos.mascotas[data.indice]);
                }
                return callback(404, {mensaje: `No se encuentra la mascota ${data.indice}`});
            }else{
                callback(200, global.recursos.mascotas);
            }
        },
        post: (data, callback) => {  //handler
            global.recursos.mascotas.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => {  //handler
            if (typeof data.indice != `undefined`) {
                if (global.recursos.mascotas[data.indice]) {
                    global.recursos.mascotas[data.indice] = data.payload;
                    return callback(200, global.recursos.mascotas[data.indice]);
                }
                return callback(404, {mensaje: `No se encuentra la mascota ${data.indice}`});
            }else{
                callback(400, {mensaje: "Indice no enviado"});
            }
        },
    },
    noEncontrado: (data, callback) => {
        callback(404, { mensaje: `No encontrado` });
    },
}