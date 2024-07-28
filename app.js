/* Definiendo variables */
const botonDesencriptar = document.querySelector('.boton-desencriptar');
const botonEncriptar = document.querySelector('.boton-encriptar');
const botonCopy = document.querySelector('.boton-copy');
const avisoMensaje = document.querySelector('.aviso-texto');
const contenedorTarjeta = document.querySelector('.tarjeta-container');
const inputTexto = document.querySelector('.encriptar');
const respuesta = document.querySelector('.evaluar');

/* Función para desencriptar texto */
function desencriptarTexto(valorTexto) {
    let textoDesencriptado = valorTexto;
    textoDesencriptado = textoDesencriptado.split('enter').join('e');
    textoDesencriptado = textoDesencriptado.split('imes').join('i');
    textoDesencriptado = textoDesencriptado.split('ai').join('a');
    textoDesencriptado = textoDesencriptado.split('ober').join('o');
    textoDesencriptado = textoDesencriptado.split('ufat').join('u');
    return textoDesencriptado;
}

/* Función para encriptar texto */
function encriptarTexto(valorTexto) {
    let textoEncriptado = valorTexto;
    textoEncriptado = textoEncriptado.split('e').join('enter');
    textoEncriptado = textoEncriptado.split('i').join('imes');
    textoEncriptado = textoEncriptado.split('a').join('ai');
    textoEncriptado = textoEncriptado.split('o').join('ober');
    textoEncriptado = textoEncriptado.split('u').join('ufat');
    return textoEncriptado;
}

/* Función para procesar el texto */
function procesarTexto(evento, esEncriptar) {
    evento.preventDefault();
    let valorTexto = inputTexto.value;
    if (!validarTexto(valorTexto)) return;

    if (esEncriptar) {
        valorTexto = encriptarTexto(valorTexto);
    } else {
        valorTexto = desencriptarTexto(valorTexto);
    }
    
    mostrarResultado(valorTexto);
}

/* Función para mostrar el resultado */
function mostrarResultado(valorTexto) {
    respuesta.innerHTML = valorTexto;
    botonCopy.style.visibility = 'inherit';
    if (contenedorTarjeta) {
        contenedorTarjeta.remove();
    }
}

/* Función para validar el texto */
function validarTexto(valorTexto) {
    if (valorTexto === "") {
        mostrarAviso("El campo de texto no debe estar vacío");
        return false;
    }
    let textoSinAcentos = valorTexto.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, "");
    if (valorTexto !== textoSinAcentos) {
        mostrarAviso("El texto no debe tener acentos ni caratéres especiales...");
        return false;
    }
    if (valorTexto !== valorTexto.toLowerCase()) {
        mostrarAviso("El texto debe ser en minúsculas...");
        return false;
    }
    return true;
}

/* Función para mostrar aviso */
function mostrarAviso(mensaje) {
    avisoMensaje.style.background = "#0A3871";
    avisoMensaje.style.color = "#FFFF";
    avisoMensaje.style.fontWeight = "800";
    avisoMensaje.textContent = mensaje;
    setTimeout(function() {
        avisoMensaje.removeAttribute('style');
    }, 1500);
}

/* Función para copiar al portapapeles */
function copiarAlPortapapeles(evento) {
    evento.preventDefault();
    let copiarTexto = respuesta;
    copiarTexto.select();
    document.execCommand('copy');
}

/* Agregando eventos a los botones */
botonEncriptar.addEventListener('click', function(evento) {
    procesarTexto(evento, true);
});

botonDesencriptar.addEventListener('click', function(evento) {
    procesarTexto(evento, false);
});

botonCopy.addEventListener('click', copiarAlPortapapeles);