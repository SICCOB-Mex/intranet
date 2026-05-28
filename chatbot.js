// =========================================================================
// LÓGICA DE INTERACCIÓN DEL CHATBOT EXTERNO
// =========================================================================
let chatIniciado = false;

// Insertar de forma automática la estructura HTML del bot en la página donde se llame
// ... dentro de chatbot.js (al inicio) ...
document.addEventListener("DOMContentLoaded", function() {
    const estructuraBot = `
        <div class="chat-burbuja" onclick="alternarChat()">
            <img id="iconoChatbotFlotante" src="chat-bot.png" alt="Soporte Bot">
        </div>
        
        <div class="chat-ventana" id="chatVentana">
            <div class="chat-header">
                <span> 🤖 SICCOB Bot 🤖</span>
                <button class="chat-cerrar" onclick="alternarChat()">✕</button>
            </div>
            <div class="chat-cuerpo" id="chatCuerpo"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', estructuraBot);
});
// ... resto del código ...

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
    const usuario = sessionStorage.getItem('nombreUsuario') || "Amo";

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
            1️⃣ <b>Paso 1:</b> <p> Preciona Win + R, para abrir el ejecutar.<br> 
            2️⃣ <b>Paso 2:</b> Ingresa la ip según el complejo direccionando a la carpeta sistema$. Ejemplo:<br>
            <img src="sistema$.png" style="width: 35%; border-radius: 6px; margin: 8px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);" alt="sistemas$"></p><br>
            3️⃣ <b>Paso 3:</b> Busca la carpeta A1SETUP e ingresa a ella.<br>
             <img src="Carpeta1.png" style="width: 35%; border-radius: 6px; margin: 8px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);" alt="sistemas$"></p><br>
            4️⃣ <b>Paso 4:</b> Ejecuta el Setup Admin One Client Installer.<br>
            <img src="a1.png" style="width: 35%; border-radius: 6px; margin: 8px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);" alt="sistemas$"></p><br>
            5️⃣ <b>Paso 5:</b> Abre el simbolo del sistema (cmd) y ejecuta los siguientes parametros: <p> a1exec setdsn</p>:Configura el portal según su ip y guarda los datos.<br><br>en el mismo cmd ejecuta a1exec setportal seguido de la ip del servidor del complejo <br>por último se ejecuta a1exec sync.<br><br> 
            <i>Si el sistema arroja un error revisa nuevamente la ip</i>
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
