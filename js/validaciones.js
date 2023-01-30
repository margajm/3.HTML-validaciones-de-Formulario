//Vamos a validar si la fecha indica que e smayor de 18 años
//Para ello primero seleccionamos el input de la fecha por su ID.
const inputNacimiento = document.querySelector("#birth") ;
//Le pasaremos un addEventListener
//El evento  será blur o sea luego que salga del input  o que se desenfoque el usuario de allí.
//Luego el siguiente parámetro será una función anónima donde recibimos el evento.
inputNacimiento.addEventListener("blur", (evento) => {
    //Evento.target retorna el objeto por el cuál se generó el evento.
    //Llamamos a la función validarNacimiento
    validarNacimiento(evento.target);
});

//Creamos una funcion para validar la fecha de nacimiento 
//Pasamos como parámetro el input
function validarNacimiento(input){
    //Creamos una nueva instancia de nuestra clase date 
    //Lo que nos interesa es validar el valor del input la fecha que puso el usuario.
    const fechaCliente = new Date(input.value);
    //Inicializaremos vacio el mensaje porque si e smayor de 18 no interesa darle algun mensaje.
    let mensaje = " ";

    //Si no es verdadero que es mayor de edad la fecha del cliente o sea si e si es false que ya tiene 18 años.
    if(!mayorDeEdad(fechaCliente)){
        //Entonces quiero que el mensaje sea:
        mensaje = "Debes tener al menos 18 años de edad";
    };

    //setCustomValidity define el mensaje de validación personalizado para el elemento seleccionado con un mensaje especifico. 
    //Entonces a esto le enviaremos un mensaje vacio si es que tiene 18, y si no el que pusimos en el if.
    input.setCustomValidity(mensaje);

};

//Funcion para validar si en la fecha hay una diferencia de 18 años.
function mayorDeEdad(fechaCliente){
        //Tenemos que hacer la comparación de la fecha actual con la fecha que ingreso el usuario.
        //Vamos solo a crear una nueva instancia de la clase date de donde obtendremos la fechaActual.
        const fechaActual = new Date();
        //Ahora haremos la comparacion con una nueva constancia que será igual a una instancia de la clase Date.
        //Y le mandaremos la fecha que estamos recibiendo que va a tener ciertos métodos.
        const diferenciaFechas = new Date(
            //Con esto vemos cuando cumple 18.
            //El año que recibimos segun el tiempo UTC y le suma 18 años para ver en que año cumpliria o cumplio 18.
            fecha.getUTCFullYear() + 18,
            //El mes que recibimos según el tiempo UTC.
            fecha.getUTCMonth(),
            //la fecha que estamos recibiendo según el tiempo UTC.
            fecha.getUTCDate()
        );
    //Verificamos si el usuario ya cumplio 18 años o si este año cumple.
    //Decimos ¿La fecha que cumple 18 es menor o igual a la fecha actual?.
    return diferenciaFechas <= fechaActual;
};