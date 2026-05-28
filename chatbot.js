// =========================================================================
// LÓGICA DE INTERACCIÓN DEL CHATBOT EXTERNO
// =========================================================================
let chatIniciado = false;

// Insertar de forma automática la estructura HTML del bot en la página donde se llame
document.addEventListener("DOMContentLoaded", function() {
    const estructuraBot = `
        <div class="chat-burbuja" onclick="alternarChat()">🤖</div>
        <div class="chat-ventana" id="chatVentana">
            <div class="chat-header">
                <span>🤖 Soporte SICCOB Bot</span>
                <button class="chat-cerrar" onclick="alternarChat()">✕</button>
            </div>
            <div class="chat-cuerpo" id="chatCuerpo"></div>
        </div>
    `;
    // Agrega el HTML al final del body de la página
    document.body.insertAdjacentHTML('beforeend', estructuraBot);
});

function alternarChat() {
    const chatVentana = document.getElementById('chatVentana');
    if (chatVentana.style.display === 'flex') {
        chatVentana.style.display = 'none';
    } else {
        chatVentana.style.display = 'flex';
        if (!chatIniciado) {
            desplegarMenuPrincipal();
            chatIniciado = true;
        }
    }
}

function desplegarMenuPrincipal() {
    const chatCuerpo = document.getElementById('chatCuerpo');
    const usuario = sessionStorage.getItem('nombreUsuario') || "Usuario";

    // Mensaje inicial del bot
    const msgBot = document.createElement('div');
    msgBot.className = 'msg msg-bot';
    msgBot.innerHTML = `Hola <b>${usuario}</b>, soy tu asistente de soporte local. ¿Con qué módulo técnico o proceso de trabajo requieres asistencia hoy?`;
    chatCuerpo.appendChild(msgBot);

    // Opciones del menú interactivo
    const contenedorOpciones = document.createElement('div');
    contenedorOpciones.className = 'bot-opciones';
    contenedorOpciones.innerHTML = `
        <button class="opcion-btn" onclick="responderOpcion('Mesa de Ayuda', 'Recuerda que para registrar tickets en Cinemex debes limpiar sesión o salir antes de loguear la cuenta compartida. ¿Requieres el enlace de restablecimiento corporativo?')">🛠️ Problema con Mesa de Ayuda</button>
        <button class="opcion-btn" onclick="responderOpcion('ADIST', 'Si la plataforma ADIST de Helpdesk no responde, verifica tu conexión al nodo central. ¿Deseas validar el estatus del servidor de soporte externo?')">📊 Falla en plataforma ADIST</button>
        <button class="opcion-btn" onclick="responderOpcion('Delivery', 'En el módulo DELIVERY puedes consultar IP, Sucursal y Nombres de equipo. Si una IP listada cambió o no responde ping, repórtalo al supervisor con la nomenclatura exacta.')">📦 Consulta sobre Equipos Delivery</button>
        <button class="opcion-btn" onclick="responderOpcion('N10', 'El Consolidado Nivel-10 muestra los cines que no atiendes directamente. Recuerda revisar la marquesina de comunicados importantes (ej. cierres de Punta Langosta y El Salto).')">🖥️ Duda con Asignaciones N10</button>
    `;
    chatCuerpo.appendChild(contenedorOpciones);
    scrollAlFinal();
}

function responderOpcion(tituloOpcion, textoRespuesta) {
    const chatCuerpo = document.getElementById('chatCuerpo');

    // 1. Pintar respuesta del usuario
    const msgUser = document.createElement('div');
    msgUser.className = 'msg msg-user';
    msgUser.innerText = tituloOpcion;
    chatCuerpo.appendChild(msgUser);

    // 2. Pintar respuesta del Bot tras un breve retraso
    setTimeout(() => {
        const msgBot = document.createElement('div');
        msgBot.className = 'msg msg-bot';
        msgBot.innerText = textoRespuesta;
        chatCuerpo.appendChild(msgBot);

        // Añadir botón para regresar al menú principal
        const contenedorOpciones = document.createElement('div');
        contenedorOpciones.className = 'bot-opciones';
        contenedorOpciones.innerHTML = `<button class="opcion-btn text-center fw-bold" onclick="LimpiarYRegresar()">⬅️ Volver al Menú de Soporte</button>`;
        chatCuerpo.appendChild(contenedorOpciones);

        scrollAlFinal();
    }, 400);
}

function LimpiarYRegresar() {
    document.getElementById('chatCuerpo').innerHTML = '';
    desplegarMenuPrincipal();
}

function scrollAlFinal() {
    const chatCuerpo = document.getElementById('chatCuerpo');
    chatCuerpo.scrollTop = chatCuerpo.scrollHeight;
}
