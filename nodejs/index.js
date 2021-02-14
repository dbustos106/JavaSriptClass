const http = require('http');
const url = require('url');
const StringDecoder = require("string_decoder").StringDecoder;

let recursos = {
    mascotas: [ {tipo: `Gato`, nombre: `Jass`, dueno: `Julian`},
                {tipo: `Gato`, nombre: `Jass`, dueno: `Julian`},
                {tipo: `Gato`, nombre: `Jass`, dueno: `Julian`},
                {tipo: `Gato`, nombre: `Jass`, dueno: `Julian`},
                {tipo: `Gato`, nombre: `Jass`, dueno: `Julian`},
                {tipo: `Gato`, nombre: `Jass`, dueno: `Julian`},
                {tipo: `Gato`, nombre: `Jass`, dueno: `Julian`}
              ]
}

const server = http.createServer((req, res) => {
    // 1. obtener la url desde el objeto request
    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);
    console.log(typeof urlParseada);
    console.log("URL: ", { urlActual, urlParseada });

    // 2. obtener la ruta
    const ruta = urlParseada.pathname;

    // 3. quitar slach
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, ``);

    // 3.1 obtener el método http
    const metodo = req.method.toLocaleLowerCase();

    // 3.2 obtener variables del query url
    const { query = {} } = urlParseada;

    // 3.3 obtener los headers
    const { headers = {} } = req;

    // 3.4 obtener payload, en el caso de haber uno
    const decoder = new StringDecoder(`utf-8`);
    let buffer = ``;

    // 3.4.1 acumular la data cuando el request reciba un payload
    req.on(`data`, (data) => {
        buffer += decoder.write(data);
    });

    // 3.4.2 terminar de acumular datos y decirle al decoder que finalice
    req.on(`end`, () => {
        buffer += decoder.end();

        if(headers["content-type"] === `application/json`){
            buffer = JSON.parse(buffer);
        }

        // 3.5 ordenar la data del request
        const data = {
            ruta: rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer 
        };

        console.log({data});

        // 3.6 elegir el manejador dependiendo de la ruta y asignarle la funcion que el enrutador tiene //handler
        let handler;
        console.log("rutalimpia: ", rutaLimpia, "metodo: ", metodo);
        if(rutaLimpia && enrutador[rutaLimpia] && enrutador[rutaLimpia][metodo]){
            handler = enrutador[rutaLimpia][metodo];
        }else{
            handler = enrutador.noEncontrado;
        }

        // 4. ejecutar handler para enviar la respuesta
        if(typeof handler === `function`){
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.setHeader("Content-Type", "application/json");
                res.writeHead(statusCode);
                // linea donde realmente se envia la respuesta a la app cliente
                res.end(respuesta);
            });
        }
    });
});

const enrutador = {
    ruta: (data, callback) => {  //handler
        callback(200, {mensaje: `Esta es /ruta`});
    },
    mascotas: {
        get: (data, callback) => {  //handler
            callback(200, recursos.mascotas);
        },
        post: (data, callback) => {  //handler
            recursos.mascotas.push(data.payload);
            callback(201, data.payload);
        },
    },
    noEncontrado: (data, callback) => {
        callback(404, {mensaje: `No encontrado`});
    },
}

server.listen(5000, () => {
    console.log("el servidor esta escuchando peticiones en http://localhost:5000/");
});