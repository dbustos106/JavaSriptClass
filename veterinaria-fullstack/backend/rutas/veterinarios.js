module.exports = function veterinariosHandler(veterinarios) {
    return {
        get: (data, callback) => {  //handler
            if (typeof data.indice != `undefined`) {
                if (veterinarios[data.indice]) {
                    return callback(200, veterinarios[data.indice]);
                }
                return callback(404, { mensaje: `No se encuentra la veterinario ${data.indice}` });
            } else {
                callback(200, veterinarios);
            }
        },
        post: (data, callback) => {  //handler
            veterinarios.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => {  //handler
            if (typeof data.indice != `undefined`) {
                if (veterinarios[data.indice]) {
                    veterinarios[data.indice] = data.payload;
                    return callback(200, veterinarios[data.indice]);
                }
                return callback(404, { mensaje: `No se encuentra la veterinario ${data.indice}` });
            } else {
                callback(400, { mensaje: "Indice no enviado" });
            }
        },
        delete: (data, callback) => {  //handler
            if (typeof data.indice != `undefined`) {
                if (veterinarios[data.indice]) {
                    veterinarios = veterinarios.filter((_veterinarios, index) => index != data.indice);
                    return callback(204, { mensaje: `Elemento con indice ${data.indice} eliminado` });
                }
                return callback(404, { mensaje: `No se encuentra la veterinario ${data.indice}` });
            } else {
                callback(400, { mensaje: "Indice no enviado" });
            }
        },
    }
}