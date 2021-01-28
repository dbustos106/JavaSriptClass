const miPromesa = new Promise((resolve, reject) => {
    const tiempoReject = Math.floor(Math.random() * 10000) + 1000;
    const tiempoResolved = Math.floor(Math.random() * 10000) + 1000;
    console.log("TiempoRejected",tiempoReject);
    console.log("TiempoResolved",tiempoResolved);
    setTimeout(() => {
        reject("La promesa falló");
    }, tiempoReject);

    setTimeout(() => {
        resolve("Promesa satisfecha");
    }, tiempoResolved);

});

miPromesa.then(
    (respuesta) => {console.log(respuesta)}, 
    (razon) => {console.log(razon)}
);
