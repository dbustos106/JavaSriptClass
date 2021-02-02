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

async function miAsyncFunction(){
    try{
        const miPromesa1 = await fabricaPromesas(1); 
        /*console.log("Este es: ", {miPromesa1});*/
        return miPromesa1;
    }catch(error){
        /*return error;*/
        throw error;
    }
}

function miFunctionNormal(){
    const miPromesa2 = fabricaPromesas(2);
    return miPromesa2;
}

miAsyncFunction()
.then((resultado) => {console.log("El resultado es: ",resultado)})
.catch((razon) => {console.log("Razon: ", razon)});

