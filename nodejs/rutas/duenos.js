module.exports = function duenosHandler(duenos) {
    return {
        get: (data, callback) => {  //handler
            if (typeof data.indice != `undefined`) {
                if (duenos[data.indice]) {
                    return callback(200, duenos[data.indice]);
                }
                return callback(404, { mensaje: `No se encuentra el dueño ${data.indice}` });
            } else {
                callback(200, duenos);
            }
        },
        post: (data, callback) => {  //handler
            duenos.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => {  //handler
            if (typeof data.indice != `undefined`) {
                if (duenos[data.indice]) {
                    duenos[data.indice] = data.payload;
                    return callback(200, duenos[data.indice]);
                }
                return callback(404, { mensaje: `No se encuentra el dueño ${data.indice}` });
            } else {
                callback(400, { mensaje: "Indice no enviado" });
            }
        },
        delete: (data, callback) => {  //handler
            if (typeof data.indice != `undefined`) {
                if (duenos[data.indice]) {
                    duenos = duenos.filter((_duenos, index) => index != data.indice);
                    return callback(204, { mensaje: `Elemento con indice ${data.indice} eliminado` });
                }
                return callback(404, { mensaje: `No se encuentra el dueño ${data.indice}` });
            } else {
                callback(400, { mensaje: "Indice no enviado" });
            }
        },
    }
}