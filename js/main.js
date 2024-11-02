const fixedButton = document.getElementById("fixedButton");
const chatContainer = document.getElementById("chatContainer");
const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
let temas = [];
let temaSeleccionado = null;
let preguntasCargadas = false;
let temasCargados = false;
let esperandoOtraPregunta = false;



function cargarTemas() {
    fetch("./json/temas.json")
    .then(response => response.json())
    .then(data => {
        console.log("Temas cargados:", data);
        temas = data;
        temasCargados = true;
        mostrarMensaje("Seleccione un tema para comenzar:", true);
        
        temas.forEach((tema, index) => {
            mostrarMensaje(`${index + 1}. ${tema.tema}`, true);
        });
    })
    .catch(error => console.error("Error al cargar los temas:", error));
}

fixedButton.addEventListener("click", function() {
    if (!chatContainer.classList.contains("slideIn")) {
        chatContainer.classList.remove("slideOut");
        chatContainer.classList.add("slideIn");

        if (!temasCargados) {
            cargarTemas();
            mostrarMensaje("Bienvenido al chatbot. Selecciona un tema para comenzar.", true);
        }
    } else {
        chatContainer.classList.remove("slideIn");
        chatContainer.classList.add("slideOut");
    }
});

function procesarEntradaUsuario(input) {
    if (!temaSeleccionado) {
        // Usuario elige el tema
        const index = parseInt(input);
        if (isNaN(index) || index < 1 || index > temas.length) {
            mostrarMensaje("Por favor, ingrese un número válido.", true);
        } else {
            temaSeleccionado = temas[index - 1];
            preguntasCargadas = false;
            esperandoOtraPregunta = false;
            cargarPreguntasRespuestas(temaSeleccionado.archivo);
        }
    } else if (esperandoOtraPregunta) {
        // Verificar si el usuario quiere hacer otra pregunta
        if (input.toLowerCase() === "si" || input.toLowerCase() === "sí") {
            esperandoOtraPregunta = false;
            mostrarPreguntas();
        } else if (input.toLowerCase() === "no") {
            resetChat();
        } else {
            mostrarMensaje("Por favor, responda con 'sí' o 'no'.", true);
        }
    } else if (!preguntasCargadas) {
        // Mostrar preguntas del tema seleccionado
        mostrarPreguntas();
        preguntasCargadas = true;
    } else {
        // Usuario selecciona una pregunta
        const preguntaIndex = parseInt(input);
        if (isNaN(preguntaIndex) || preguntaIndex < 1 || preguntaIndex > temaSeleccionado.preguntasRespuestas.length) {
            mostrarMensaje("Por favor, ingrese un número válido para seleccionar una pregunta.", true);
        } else {
            mostrarRespuesta(preguntaIndex - 1);
        }
    }
}

document.getElementById("sendButton").addEventListener("click", function() {
    const userInputText = userInput.value.trim();
    if (userInputText === "") return;

    mostrarMensaje(userInputText, false);
    procesarEntradaUsuario(userInputText);
    userInput.value = "";
});

function mostrarMensaje(texto, esBot = false) {
    const mensaje = document.createElement("div");
    mensaje.classList.add("mensaje");
    if (esBot) {
        mensaje.classList.add("bot");
    } else {
        mensaje.classList.add("usuario");
    }
    mensaje.textContent = texto;

    chatBody.appendChild(mensaje);
    chatBody.scrollTop = chatBody.scrollHeight;
}

async function cargarPreguntasRespuestas(archivo) {
    try {
        const response = await fetch(`./json/${archivo}`);
        temaSeleccionado.preguntasRespuestas = await response.json();
        mostrarMensaje(`Has seleccionado el tema: ${temaSeleccionado.tema}. A continuación, elige una pregunta para ver la respuesta.`, true);
        mostrarPreguntas();
    } catch (error) {
        mostrarMensaje("Error al cargar las preguntas y respuestas.", true);
        console.error("Error en cargarPreguntasRespuestas:", error);
    }
}

function mostrarPreguntas() {
    temaSeleccionado.preguntasRespuestas.forEach((pregunta, index) => {
        mostrarMensaje(`${index + 1}. ${pregunta.pregunta}`, true);
    });
    mostrarMensaje("Escribe el número de la pregunta para obtener la respuesta.", true);
}

function mostrarRespuesta(preguntaIndex) {
    const respuesta = temaSeleccionado.preguntasRespuestas[preguntaIndex].respuesta;
    mostrarMensaje(`Respuesta: ${respuesta}`, true);
    esperandoOtraPregunta = true;
    mostrarMensaje("¿Desea hacer otra pregunta sobre este tema? Responda 'sí' o 'no'.", true);
}

function resetChat() {
    temaSeleccionado = null;
    preguntasCargadas = false;
    esperandoOtraPregunta = false;
    chatBody.innerHTML = ""; // Limpia el chat para evitar mensajes duplicados
    cargarTemas();
}
