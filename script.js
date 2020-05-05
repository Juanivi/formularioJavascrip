
//EXPRESIONES REGULARES

//8 digitos un guión y una letra mayuscula o minuscula
let patronNIF = /^\d{8}[-][A-Za-z]$/;

/*w+: que puede empezar por cualquier letra o numero 1 o mas veces
  ([\.-]?\w+): puede aparecer (o no) un punto seguido de caracteres (letras o numeros) 1 o mas veces
  @: obligatoria la arroba
  w+: despues de la @ caracteres 1 o mas veces
  ([\.-]?\w+): puede o no aparecer un punto, caracteres 1 o mas veces
  \w{2,3})+: debe haber un punto seguido de caracteres como minimo 2 y maximo 3*/
let patronEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

/* esta expresión indica que la fecha solo puede tener el formato dd-mm-aaaa
2 digito para el dia, 2 digitos para el mes y 4 digitos para el año  */
let patronFecha = /^(\d{2})-(\d{2})-(\d{4})$/;

//esta expresión indica que solo puede haber 9 numeros del 0-9
let patronTelefono = /^[0-9]{9}$/;

//indica que la hora debe tener dos digitos del 0-9, dos puntos y 2 digitos del 0-9  hh:mm
let patronHora = /^[0-9]{2}[:][0-9]{2}$/;

// ---------------------------------------------------------------------------------------------------

window.onload = iniciar;
function iniciar() {
	document.formulario.nombre.focus(); //pone el foco al cargar la pagina en la caja de texto nombre

	//evento del botón enviar. LLama a las funciones al hacer click
	formulario.enviar.addEventListener('click', validar, false);
	formulario.enviar.addEventListener('click', Cookie, false);
	formulario.nombre.addEventListener('blur', mayusculas, false);
	formulario.apellidos.addEventListener('blur', mayusculas, false);
}

//función que comprueba las funciónes de validación
function validar(objeto) {
	//si las funciones son correctas y han retornado un true
	if (validarNombreApellidos() && validarEdad() && validarNif() && validaEmail() && validarProvincia() && validaFecha() &&
		validaTelefono() && validaHora() && confirm("La validación del  formulario es correcta\n\n¿Deseas enviarlo?"))
		return true;
	else {
		objeto.preventDefault();
		return false;
	}
}

//Función que valida que el nombre y el apellido no este vacio
function validarNombreApellidos() {
	let error = document.getElementById('error'); //acceso a la etiqueta donde se escribirá los distintos errores

	if (formulario.nombre.value == "") {
		error.innerHTML = "El campo nombre está vacio";
		formulario.nombre.focus(); //pone el foco en la etiqueta nombre
		return false;
	}
	else if (formulario.apellidos.value == "") {
		error.innerHTML = "El campo apellidos está vacio";
		formulario.apellidos.focus();
		return false;
	}
	return true;
}



//función que valida que el campo nif no este vacio y que tenta 8 digitos, un guión y una letra
function validarNif() {
	let error = document.getElementById('error');

	if (document.formulario.nif.value == "") {
		error.innerHTML = "El campo nif está vacio";
		formulario.nif.focus();
		return false;
	}
	//sin no se cumple el patron
	else if (!patronNIF.test(formulario.nif.value)) {
		error.innerHTML = "El campo nif tiene que tener 8 digitos, un guión y una letra";
		formulario.nif.focus();
		return false;
	}
	return true;
}

//función que valida el email
function validaEmail() {
	let error = document.getElementById('error');

	if (formulario.email.value == "") {
		error.innerHTML = "El campo E-mail esta vacio";
		document.formulario.email.focus();
		return false;
	}
	else if (!patronEmail.test(formulario.email.value)) {
		error.innerHTML = "El correo es incorrecto, revisalo";
		document.formulario.email.focus();
		return false;
	}
	return true;
}

//fución que valida la fecha de nacimiento
function validaFecha() {
	let error = document.getElementById('error');

	if (formulario.nacimiento.value == "") {
		error.innerHTML = "La fecha de nacimiento está vacia";
		document.formulario.nacimiento.focus();
		return false;
	}
	else if (!patronFecha.test(formulario.nacimiento.value)) {
		error.innerHTML = "La fecha de nacimiento es incorrecta, debe ser dd-mm-aaaa";
		document.formulario.nacimiento.focus();
		return false;
	}
	return true;
}

//función que valida el telefono
function validaTelefono() {
	let error = document.getElementById('error');

	if (formulario.telefono.value == "") {
		error.innerHTML = "El campo telefono está vacio";
		document.formulario.telefono.focus();
		return false;
	}
	else if (!patronTelefono.test(formulario.telefono.value)) {
		error.innerHTML = "El telefono es incorrecto, debe tener 9 digitos";
		document.formulario.telefono.focus();
		return false;
	}
	return true;
}


//Función que valida la edad
function validarEdad() {
	let error = document.getElementById('error');

	//sin no es un número
	if (isNaN(formulario.edad.value)) {
		error.innerHTML = "El campo edad no es valido no es un número";
		formulario.edad.focus()
		return false;
	}
	//si esta vacio
	else if (formulario.edad.value == "") {
		error.innerHTML = "El campo edad esta vacio";
		formulario.edad.focus()
		return false;
	}
	//sin no esta dentro del rango 0 - 105
	else if (formulario.edad.value < 0 || formulario.edad.value > 105) {
		error.innerHTML = "El campo edad tiene que estar comprendido entre 0 y 105";
		formulario.edad.focus()
		return false;
	}
	return true;
}

//función que valida la hora
function validaHora() {
	let error = document.getElementById('error');

	if (formulario.hora.value == "") {
		error.innerHTML = "El campo hora está vacio";
		formulario.hora.focus()
		return false;
	}
	else if (!patronHora.test(formulario.hora.value)) {
		error.innerHTML = "El campo hora tiene que tener el formato hh:mm";
		formulario.hora.focus()
		return false;
	}
	return true;
}


//Función que valida si está seleccionada una provincia
function validarProvincia() {
	if (formulario.provincia.selectedIndex == 0) {
		error.innerHTML = `Debes seleccinar una provincia`;
		document.formulario.provincia.focus();
		return false;
	}
	else
		return true;
}

//función que convierte a mayusculas el texto escrito en el campo nombre y apellidos
function mayusculas() {
	document.formulario.nombre.value = formulario.nombre.value.toUpperCase();
	document.formulario.apellidos.value = formulario.apellidos.value.toUpperCase();
}

//------- CREACIÓN DE LA COOKIE -------------------------------------------------------

let conta = 1; //variable que va almacenando cada envio del formulario

//función que crea la cookie
function Cookie(){
	//acceso a la etiqueta del HTML donde se escribirá los datos
	let intento = document.getElementById('intento');

	//crea la cookie con lo acumulado en la variable conta
	document.cookie = "formulario" + conta++; 
	//document.cookie = `formulario ${conta++}`;

	//escribe el valor de la cookie en la pagina
	intento.innerHTML = `Intentos del envio del formulario: ${document.cookie.substring(10,12)}`;
}