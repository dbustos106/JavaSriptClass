module.exports = function mascotasHandler(mascotas) {
    return {
        get: (data, callback) => {  //handler
            if (typeof data.indice != `undefined`) {
                if (mascotas[data.indice]) {
                    return callback(200, mascotas[data.indice]);
                }
                return callback(404, { mensaje: `No se encuentra la mascota ${data.indice}` });
            } else {
                callback(200, mascotas);
            }
        },
        post: (data, callback) => {  //handler
            mascotas.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => {  //handler
            if (typeof data.indice != `undefined`) {
                if (mascotas[data.indice]) {
                    mascotas[data.indice] = data.payload;
                    return callback(200, mascotas[data.indice]);
                }
                return callback(404, { mensaje: `No se encuentra la mascota ${data.indice}` });
            } else {
                callback(400, { mensaje: "Indice no enviado" });
            }
        },
        delete: (data, callback) => {  //handler
            if (typeof data.indice != `undefined`) {
                if (mascotas[data.indice]) {
                    mascotas = mascotas.filter((_mascotas, index) => index != data.indice);
                    return callback(204, { mensaje: `Elemento con indice ${data.indice} eliminado` });
                }
                return callback(404, { mensaje: `No se encuentra la mascota ${data.indice}` });
            } else {
                callback(400, { mensaje: "Indice no enviado" });
            }
        },
    }
}