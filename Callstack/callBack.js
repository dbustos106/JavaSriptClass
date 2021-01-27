function sumar(num1, num2){
    return num1 + num2;
}

function restar(num1, num2){
    return num1 - num2;
}

function multiplicar(num1, num2){
    return num1 * num2;
}

function multiFuncion(num1, num2, callBack){
    const resultado = callBack(num1, num2);
    console.log(resultado);
}

multiFuncion(5, 4, sumar);

multiFuncion(5, 4, multiplicar);

multiFuncion(5, 4, restar);
