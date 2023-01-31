//Este input estará vinculado a otro archivo que iremos generando
//valida va a recibir el input, va a verificar cuál es el tipo de input a través de dataset.tipo 
// valid verifica si está valido o no lo que el usuario ingresó en el input.
//y dependiendo de eso agregar o quitar la clase CSS que hace que se ponga rojo el input como inválido.
//esta función se manda llamar cada vez que el usuario sale del input que estaba rellenando.
//exportamos para usarla en otros archivos
export function valida(input){
    //Dataset lo que nosotros estamos obteniendo es la colección de todos los datas atribute
    //El punto tipo nos hace obtener todos los input con el data atributte llamado tipo.
    const tipoDeInput = input.dataset.tipo;
    //Necesitamos por cada uno de los tipos de input o por el tipo de input, verificar si existe dentro de los validadores.
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    };

    //Verificaremos con esto si lo que está dentro del input es válido.
    //Validity:  Devuelve un objeto ValidityState que contiene varias propiedades que describen el estado de validez del elemento.
    //Valid:Devuelve true si el elemento cumple con todas sus restricciones de validación y por lo tanto se considera válido, 
    //o false si falla alguna restricción. 
    if(input.validity.valid){
        //si está en true (es válido) quiero que quite la clase CSS que indica que es inválido lo que puso el usuario.
        input.parentElement.classList.remove("input-container--invalid");     
        //Si es true quiero que el contenido de ese span de mensajes de errora sea igual a un string vacío. 
        input.parentElement.querySelector(".input-message-error").innerHTML="";

    } else {
        // Si esta en false o sea es inválido lo que escribio en el input el usuario.
        //Entonces tenemos que agregar o poner la clase al padre del input en este caso al div.
        //la clase CCS para que represente que está mal o es inválido. 
        input.parentElement.classList.add("input-container--invalid");
        //En caso de que si existe algún error, lo que quiero es mostrar mensaje de error llamando a esa funcion, para que se entienda mejor.
        //Esta funcion de mostrarMensaje de error su primer parametro es el tipo de input y el segundo el input.
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput,input);

    };
};

//Este arreglo nos ayudará a interceptar dependiendo del tipo de input, para cada tipo de errores, lo voy a recorrer.
const tipoDeErrores = [
    //Error de que falta el valor(el usuario dejo en blanco el campo).
    "valueMissing",
    //Error de que no  coincide con el type de input que definimos en el HTML ejemplo type = "email",
    "typeMismatch",
    //Error de que no coincide con el patron que pusimos por ejemplo un regex pattern
    "patternMismatch",
    //Error personalizado que configuramos para validar algo.
    "customError",
];

//Esto nos ayudará con los tipos de errores de cada uno de los inputs de nuestro formulario.
//Para cada tipo de error mostraremos un mensaje diferente.
const mensajesDeError =  {
    //Tenemos nuestros tipos de inputs que tienen el data atribute llamado tipo.
    //Tenemos primero al objeto del input del nombre.
    nombre: {
        //Con ValueMissing verificamos si el valor está faltando si el usuario no puso nada allí.
        valueMissing:"El campo nombre no puede estar vacío.",
    },

    email: {
        //Con ValueMissing verificamos si el valor está faltando si el usuario no puso nada allí.
        valueMissing:"El campo correo no puede estar vacío.",
        //typeMissmatch hace referencia a que si es un correo electrónico.
        typeMismatch:"El correo no es válido",
    },

    password: {
        //Con ValueMissing verificamos si el valor está faltando si el usuario no puso nada allí.
        valueMissing:"El campo contraseña no puede estar vacío.",
        patternMismatch:"Al menos 6 caracteres, un máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",

    },

    nacimiento: {
        //Con ValueMissing verificamos si el valor está faltando si el usuario no puso nada allí.
        valueMissing:"El campo fecha de nacimiento no puede estar vacío.",
        customError: "Debes tener al menos 18 años de edad",
    },

    numero : {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "El formato requerido es XXXXXXXXXX.",
    },
};

const validadores = {
    //Vemos que coincidan el nombre del tipo = nacimiento con la llave dentro de este objeto que es una arrow funcion.
    //Una función que va a recibir input y lo que va a hacer es mandar a llamar validarNacimiento. 
    nacimiento: (input) => validarNacimiento(input),
};

//Esta funcion de mostrarMensaje de error su primer parametro es el tipo de input y el segundo el input.
function mostrarMensajeDeError(tipoDeInput, input) {
    //Tenemos un mensaje que es el que queremos decirle al usuario dependiendo de si el campo está vacío, 
    let mensaje ="";
    //En este tipo de errores voy a recibir cada uno de los errores que está en el arreglo..
    tipoDeErrores.forEach((error) => {
        //Vamos a buscar con validity si dentro de nuestro input hay alguno de los errores del arreglo.
        if(input.validity[error]){
            //Con esto vemos cuál tipo de Input y cual es el error específico
            console.log(tipoDeInput, error);
            //Con esto validamos si es que hay algun error.
            console.log(input.validity[error]);
            //Necesitamos ver cual es el tipo de Input que nos dió error y acceder a los mensajesDeError con sus valores.
            console.log(mensajesDeError[tipoDeInput][error]);
            // El mensaje va a ser igual a nuestro objeto donde están todos los mensajes de error para cada tipo de input.
            //luego entre corchetes, el tipo de input para poder acceder a si es nombre, email, password, nacimiento,  y por último el error.
            mensaje = mensajesDeError[tipoDeInput][error];
        };

    })

    return mensaje;
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