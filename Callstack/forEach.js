let array = ["Hola", "Adios"];


function miFuncion1(actual, indice, arreglo){
  console.log(actual.toUpperCase());
  console.log(indice);
  console.log(arreglo);
}

function miFuncion2(actual, indice, arreglo){
    return actual.toUpperCase();
  }

array.forEach(miFuncion1);

array.map(miFuncion2);

