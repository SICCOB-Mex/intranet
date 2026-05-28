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
        <button class="opcion-btn" onclick="ejecutarPasosA1()">⚙️ Instalación de A1</button>
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

// =========================================================================
// PROCESO DE SOPORTE: PASO A PASO PARA INSTALACIÓN DE A1
// =========================================================================
function ejecutarPasosA1() {
    const chatCuerpo = document.getElementById('chatCuerpo');

    // 1. Simulamos que el usuario presionó la opción
    const msgUser = document.createElement('div');
    msgUser.className = 'msg msg-user';
    msgUser.innerText = "Instalación de A1";
    chatCuerpo.appendChild(msgUser);

    // 2. El Bot responde con el instructivo estructurado
    setTimeout(() => {
        const msgBot = document.createElement('div');
        msgBot.className = 'msg msg-bot';
        
        // Puedes cambiar este texto por tus pasos reales de trabajo:
        msgBot.innerHTML = `
            <b>Guía de Instalación del Módulo A1:</b><br><br>
            1️⃣ <b>Paso 1:</b> Descarga el paquete oficial desde el repositorio local o solicita el archivo .zip al supervisor.<br>
            2️⃣ <b>Paso 2:</b> Descomprime los archivos en la ruta raíz del sistema <code>C:\\SICCOB\\A1</code>.<br>
            3️⃣ <b>Paso 3:</b> Abre la consola de comandos (CMD) como Administrador y ejecuta el comando de inicialización.<br>
            4️⃣ <b>Paso 4:</b> Configura la IP del nodo asignado en el archivo de propiedades y guarda los cambios.<br>
            5️⃣ <b>Paso 5:</b> Reinicia el servicio y realiza una prueba de ping para validar la conexión con la Mesa de Ayuda.<br><br>
            <i>Si el sistema arroja un error de credenciales o de puerto bloqueado, comunícate de inmediato con el Administrador de red.</i>
        `;
        chatCuerpo.appendChild(msgBot);

        // Añadimos el botón obligatorio para regresar al menú principal
        const contenedorOpciones = document.createElement('div');
        contenedorOpciones.className = 'bot-opciones';
        contenedorOpciones.innerHTML = `<button class="opcion-btn text-center fw-bold" onclick="LimpiarYRegresar()">⬅️ Volver al Menú de Soporte</button>`;
        chatCuerpo.appendChild(contenedorOpciones);
        
        scrollAlFinal();
    }, 400);
}
