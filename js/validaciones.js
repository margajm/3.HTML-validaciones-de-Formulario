//Este input estará vinculado a otro archivo que iremos generando
//valida va a recibir el input, va a verificar cuál es el tipo de input a través de dataset.tipo 
// valid verifica si está valido o no lo que el usuario ingresó en el input.
//y dependiendo de eso agregar o quitar la clase CSS que hace que se ponga rojo el input como inválido.
//esta función se manda llamar cada vez que el usuario sale del input que estaba rellenando.
//exportamos para usarla en otros archivos
export function valida(input){
    //Dataset lo que nosotros estamos obteniendo es la colección de todos los datas atribute
    //El punto tipo es para obtener el de la fecha de nacimiento que le pusimos como nombre tipo.
    const tipoDeInput = input.dataset.tipo;
    //Necesitamos por cada uno de los tipos de input o por el tipo de input, verificar si existe dentro de los validadores.
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    };

    //Verificaremos con esto si lo que está dentro del input es válido.
    //si está en true, quiero que quite la clase del rojito que avisa que está mal lo que puso el usuario.
    //Validity:  Devuelve un objeto ValidityState que contiene varias propiedades que describen el estado de validez del elemento.
    //Valid:Devuelve true si el elemento cumple con todas sus restricciones de validación y por lo tanto se considera válido, 
    //o false si falla alguna restricción. 
    if(input.validity.valid){
        //si está en true (es válido) quiero que quite la clase CSS que indica que es inválido lo que puso el usuario.
        input.parentElement.classList.remove("input-container--invalid");

    } else {
        // Si esta en false o sea es inválido lo que escribio en el input el usuario.
        //Entonces tenemos que agregar o poner la clase al padre del input en este caso al div.
        //la clase CCS para que represente que está mal o es inválido. 
        input.parentElement.classList.add("input-container--invalid");

    };
};

//Esto nos ayudará con los tipos de errores de cada uno de los inputs de nuestro formulario.
//Para cada tipo de error mostraremos un mensaje diferente.
const mensajesDeError =  {
    //Tenemos primero al objeto del input del nombre.
    nombre: {
        //Con ValueMissing verificamos si el valor está faltando si el usuario no puso nada allí.
        valueMissing:"Este campo no puede estar vacío."
    },

    email: {
        //Con ValueMissing verificamos si el valor está faltando si el usuario no puso nada allí.
        valueMissing:"Este campo no puede estar vacío.",
        //typeMissmatch hace referencia a que si es un correo electrónico.
        typeMissmatch: "El correo no es válido.",
    },

    password: {
        //Con ValueMissing verificamos si el valor está faltando si el usuario no puso nada allí.
        valueMissing:"Este campo no puede estar vacío.",
        patternMissmatch:"Al menos 6 caracteres, un máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."

    },

    nacimiento: {
        //Con ValueMissing verificamos si el valor está faltando si el usuario no puso nada allí.
        valueMissing:"Este campo no puede estar vacío.",
        customError: "Debes tener al menos 18 años de edad",
    },

};

const validadores = {
    //Vemos que coincidan el nombre del tipo = nacimiento con la llave dentro de este objeto que es una arrow funcion.
    //Una función que va a recibir input y lo que va a hacer es mandar a llamar validarNacimiento. 
    nacimiento: (input) => validarNacimiento(input),
};

//Creamos una funcion para validar la fecha de nacimiento 
//Pasamos como parámetro el input
function validarNacimiento(input){
    //Creamos una nueva instancia de nuestra clase date 
    //Lo que nos interesa es validar el valor del input la fecha que puso el usuario.
    const fechaCliente = new Date(input.value);
    //Inicializaremos vacio el mensaje porque si e smayor de 18 no interesa darle algun mensaje.
    let mensaje = "";

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
function mayorDeEdad(fecha){
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