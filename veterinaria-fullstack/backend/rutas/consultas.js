module.exports = function consultasHandler({consultas, veterinarios, mascotas}) {
    return {
        get: (data, callback) => {  //handler
            if (typeof data.indice != `undefined`) {
                if (consultas[data.indice]) {
                    return callback(200, consultas[data.indice]);
                }
                return callback(404, { mensaje: `No se encuentra la consulta ${data.indice}` });
            } else { 
                const consultasConRelaciones = consultas.map((consulta) => {
                    return {...consulta, 
                    mascota: {...mascotas[consulta.mascota], id: consulta.mascota},
                    veterinario: {...veterinarios[consulta.veterinario], id:consulta.veterinario}};
                }); 
                callback(200, consultasConRelaciones);
            }
        },
        post: (data, callback) => {  //handler
            let nuevaConsulta = data.payload;
            nuevaConsulta.fechaCreacion = new Date();
            consultas = [... consultas, nuevaConsulta]
            callback(201, data.payload);
        },
        put: (data, callback) => {  //handler
            if (typeof data.indice != `undefined`) {
                if (consultas[data.indice]) {
                    let {fechaCreacion} = consultas[data.indice];
                    consultas[data.indice] = {
                        ...data.payload,
                        fechaCreacion,
                        fechaEdicion: new Date()
                    };
                    return callback(200, consultas[data.indice]);
                }
                return callback(404, { mensaje: `No se encuentra el consulta ${data.indice}` });
            } else {
                callback(400, { mensaje: "Indice no enviado" });
            }
        },
        delete: (data, callback) => {  //handler
            if (typeof data.indice != `undefined`) {
                if (consultas[data.indice]) {
                    consultas = consultas.filter((_consultas, index) => index != data.indice);
                    return callback(204, { mensaje: `Elemento con indice ${data.indice} eliminado` });
                }
                return callback(404, { mensaje: `No se encuentra el consulta ${data.indice}` });
            } else {
                callback(400, { mensaje: "Indice no enviado" });
            }
        },
    }
}