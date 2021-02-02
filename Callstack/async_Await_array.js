const fabricaPromesas = (indice) => new Promise((resolve, reject) => {
    const tiempoReject = Math.floor(Math.random() * 10000) + 1000;
    const tiempoResolved = Math.floor(Math.random() * 10000) + 1000;
    /*setTimeout(() => {
        reject(`La promesa ${indice} falló`);
    }, tiempoReject);*/

    setTimeout(() => {
        resolve(`Promesa ${indice} satisfecha`);
    }, tiempoResolved);
});

async function miAsyncFunction() {
    try {
        let misPromesas = []
        for (let i = 0; i < 10; i++) {
            misPromesas = [...misPromesas, await fabricaPromesas(i)];
        }
        console.log("Variable mis promesas al interior de la async Function",misPromesas);
        return misPromesas;
    } catch (error) {
        throw error;
    }
}

function miFunctionNormal() {
    return fabricaPromesas(2);
}

/*miAsyncFunction().then((resultado) => {console.log("Resultado ==> ",resultado)})
.catch((razon) => {console.log("Razon ==> ", razon)});*/

