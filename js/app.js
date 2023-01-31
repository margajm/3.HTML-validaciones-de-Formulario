//Importamos nuestra funcion llamada valida
import { valida } from "./validaciones.js";
//necesitamos es agregar el addEventListener que va a mandar a llamar esta función llamada valida 
//cada vez que el input sufra el cambio o tenga el cambio de blur, cada vez que salga el usuario de ese input.

// Creamos una constante seleccione todos nuestros elementos que sean de tipo input.
// Cuando digo document.querySelectorAll lo que me va a regresar es un arreglo.
const inputs = document.querySelectorAll("input");

//Para cada uno de los inputs vamos a obtener input,
inputs.forEach((input) => {
        //le va a agregar a cada uno de estos inputs el addEventListener de blur cuando salga de foco 
        //y cuando salga de foco va a mandar a llamar esta función que recibe al input la cual es “valida”.
        input.addEventListener("blur", (input) => {
        //valida va a verificar cuál es el tipo de input a través de dataset.tipo 
        //El .target nos indica donde ocurrio el evento.
           valida(input.target);
        } )
});
