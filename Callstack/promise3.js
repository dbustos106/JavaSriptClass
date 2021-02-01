const fabricaPromesas = (indice) => new Promise((resolve, reject) => {
    const tiempoReject = Math.floor(Math.random() * 10000) + 1000;
    const tiempoResolved = Math.floor(Math.random() * 10000) + 1000;
    setTimeout(() => {
        reject(`La promesa ${indice} falló`);
    }, tiempoReject);

    setTimeout(() => {
        resolve(`Promesa ${indice} satisfecha`);
    }, tiempoResolved);
});

let misPromesas = []

for (let i = 0; i < 10; i++) {
    misPromesas = [...misPromesas, fabricaPromesas(i)];
}

/*Promise.all(misPromesas)
        .then((respuesta) => {console.log(respuesta)})
        .catch((razon) => {console.log(razon)});*/

/*Promise.allSettled(misPromesas)
        .then((respuesta) => {console.log(respuesta)})
        .catch((razon) => {console.log(razon)});*/
/*Comentario*/
Promise.race(misPromesas)
        .then((respuesta) => {console.log(respuesta)})
        .catch((razon) => {console.log(razon)});
