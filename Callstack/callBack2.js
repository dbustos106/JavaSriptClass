const miBoton = document.getElementById("miBoton")

const ejecutarClickBoton = (evento) => {
    console.log(evento);
    alert("Diste click en el botón")
}

miBoton.addEventListener("click", ejecutarClickBoton); 

ejecutarClickBoton();