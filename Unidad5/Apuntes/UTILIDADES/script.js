// Función de utilidad para mostrar logs en la pantalla
function log(mensaje) {
    const output = document.getElementById('console-output');
    output.innerHTML += `<div>> ${mensaje}</div>`;
    console.log(mensaje);
    output.scrollTop = output.scrollHeight; // Auto-scroll al final
}

/**
 * ==========================================
 * 1. EVENT.TARGET vs EVENT.CURRENTTARGET
 * ==========================================
 * 
 * ¿Cuándo usarlo?
 * - event.target: Es el elemento EXACTO donde hiciste clic.
 * - event.currentTarget: Es el elemento que TIENE el addEventListener.
 * 
 * Ejemplo: Si tienes un <div> (padre) con un listener, y dentro hay un <button> (hijo).
 * Si haces clic en el botón:
 * - target será el botón.
 * - currentTarget será el div.
 */
const padre = document.getElementById('padre');

padre.addEventListener('click', (event) => {
    log('--- Click en el contenedor ---');
    log(`event.target: ${event.target.id || event.target.tagName} (Donde hiciste click)`);
    log(`event.currentTarget: ${event.currentTarget.id} (Quien tiene el listener)`);
    
    // CASO DE USO:
    // Usa 'target' si quieres saber exactamente qué elemento tocó el usuario (útil en delegación).
    // Usa 'currentTarget' si quieres asegurarte de referenciar al elemento contenedor que estás controlando.
});


/**
 * ==========================================
 * 2. PREVENTDEFAULT
 * ==========================================
 * 
 * ¿Cuándo usarlo?
 * Cuando quieres evitar que el navegador haga su acción por defecto.
 * 
 * Casos comunes:
 * - Evitar que un enlace (<a>) recargue la página o navegue.
 * - Evitar que un formulario (<form>) se envíe y recargue la página.
 * - Evitar que el menú contextual (click derecho) aparezca.
 */
const enlace = document.getElementById('mi-enlace');
const formulario = document.getElementById('mi-form');

enlace.addEventListener('click', (event) => {
    // Detenemos la navegación a Google
    event.preventDefault();
    log('¡Navegación detenida! preventDefault() funcionó.');
});

formulario.addEventListener('submit', (event) => {
    // Detenemos el envío del formulario
    event.preventDefault();
    log('¡Envío de formulario detenido! Los datos no se enviaron al servidor.');
});


/**
 * ==========================================
 * 3. STOPPROPAGATION
 * ==========================================
 * 
 * ¿Cuándo usarlo?
 * Cuando tienes un elemento dentro de otro, y ambos tienen eventos 'click',
 * pero NO quieres que al hacer clic en el hijo, se active también el padre.
 * 
 * Esto detiene el "burbujeo" (bubbling) del evento hacia arriba.
 */
const contenedorBurbuja = document.getElementById('contenedor-burbuja');
const botonStop = document.getElementById('boton-stop');

contenedorBurbuja.addEventListener('click', () => {
    log('Click en el CONTENEDOR (Burbuja)');
});

botonStop.addEventListener('click', (event) => {
    // ¡AQUÍ ESTÁ LA MAGIA!
    event.stopPropagation(); 
    
    log('Click en el BOTÓN (stopPropagation activado)');
    log('Nota como el evento del contenedor NO se disparó.');
});


/**
 * ==========================================
 * 4. DELEGACIÓN DE EVENTOS
 * ==========================================
 * 
 * ¿Cuándo usarlo?
 * Cuando tienes una lista de elementos que pueden cambiar (agregarse o eliminarse) dinámicamente.
 * En lugar de poner un listener a CADA botón nuevo, pones UNO SOLO al padre.
 * 
 * Aquí combinamos el uso de 'event.target'.
 */
const listaBotones = document.getElementById('lista-botones');
const btnAgregar = document.getElementById('btn-agregar');

// Agregamos botones nuevos dinámicamente
let contador = 3;
btnAgregar.addEventListener('click', () => {
    const nuevoBoton = document.createElement('button');
    nuevoBoton.textContent = `Botón ${contador++}`;
    nuevoBoton.className = 'btn-dinamico';
    nuevoBoton.style.marginLeft = '5px';
    listaBotones.appendChild(nuevoBoton);
});

// Listener ÚNICO en el padre (la lista)
listaBotones.addEventListener('click', (event) => {
    // Verificamos si lo que se clickeó fue un botón
    // .matches() comprueba si el elemento cumple con el selector CSS
    if (event.target.matches('button.btn-dinamico')) {
        log(`¡Hiciste clic en ${event.target.textContent} usando Delegación!`);
        
        // Podemos manipular el botón clickeado directamente
        event.target.style.backgroundColor = '#bbf7d0';
    }
});


/**
 * ==========================================
 * 5. MOUSEOVER / MOUSEOUT
 * ==========================================
 * 
 * ¿Cuándo usarlo?
 * Para efectos de "Hover" (pasar el ratón por encima).
 * - mouseover: Cuando el ratón ENTRA al elemento.
 * - mouseout: Cuando el ratón SALE del elemento.
 */
const cajaHover = document.getElementById('caja-hover');

cajaHover.addEventListener('mouseover', () => {
    cajaHover.style.backgroundColor = '#fca5a5'; // Rojo claro
    cajaHover.textContent = '¡Ratón DENTRO!';
    log('Evento: mouseover');
});

cajaHover.addEventListener('mouseout', () => {
    cajaHover.style.backgroundColor = 'transparent';
    cajaHover.textContent = 'Pasa el ratón aquí';
    log('Evento: mouseout');
});


/**
 * ==========================================
 * 6. INPUT vs CHANGE
 * ==========================================
 * 
 * ¿Cuándo usarlo?
 * - input: Se dispara CADA VEZ que escribes una letra. Ideal para búsquedas en tiempo real o validación instantánea.
 * - change: Se dispara SOLO cuando terminas de editar y sales del campo (pierdes el foco) o pulsas Enter. Ideal para guardar datos finales.
 */
const campoInput = document.getElementById('campo-input');
const resInput = document.getElementById('res-input');

const campoChange = document.getElementById('campo-change');
const resChange = document.getElementById('res-change');

campoInput.addEventListener('input', (event) => {
    // event.target.value contiene lo que estás escribiendo
    resInput.textContent = event.target.value;
    log(`Input: ${event.target.value}`);
});

campoChange.addEventListener('change', (event) => {
    resChange.textContent = event.target.value;
    log(`Change (Confirmado): ${event.target.value}`);
});


/**
 * ==========================================
 * 7. TARGET PRÁCTICO (PALETA DE COLORES)
 * ==========================================
 * 
 * Un ejemplo clásico de Delegación y uso de Target.
 * Tenemos un contenedor (padre) con varios cuadros de colores (hijos).
 * Queremos saber a cuál color le dio click el usuario.
 */
const paleta = document.getElementById('paleta');
const cajaDestino = document.getElementById('caja-destino');

paleta.addEventListener('click', (event) => {
    // Verificamos si el click fue en uno de los cuadros de color
    // Usamos .classList.contains() para ver si tiene la clase 'color-btn'
    if (event.target.classList.contains('color-btn')) {
        
        // Obtenemos el color guardado en el atributo 'data-color'
        // dataset accede a los atributos data-*
        const colorElegido = event.target.dataset.color;
        
        log(`Click en color: ${colorElegido}`);
        
        // Aplicamos el color a la caja destino
        cajaDestino.style.backgroundColor = colorElegido;
        cajaDestino.textContent = `Color aplicado: ${colorElegido.toUpperCase()}`;
        cajaDestino.style.color = 'white';
    }
});

/**
 * ==========================================
 * 8. EVENTOS DE TECLADO (KEYDOWN / KEYUP)
 * ==========================================
 * 
 * ¿Cuándo usarlo?
 * Para detectar qué teclas presiona el usuario.
 * - keydown: Cuando la tecla baja (se presiona). Si la mantienes, se repite.
 * - keyup: Cuando la tecla sube (se suelta).
 * 
 * Propiedades útiles:
 * - event.key: El valor de la tecla ('a', 'Enter', 'ArrowUp').
 * - event.code: El código físico de la tecla ('KeyA', 'Enter'). Útil para juegos (WASD).
 */
const inputTeclado = document.getElementById('input-teclado');
const resTecla = document.getElementById('res-tecla');
const resCode = document.getElementById('res-code');

inputTeclado.addEventListener('keydown', (event) => {
    resTecla.textContent = event.key;
    resCode.textContent = event.code;
    
    log(`KeyDown: Key="${event.key}" Code="${event.code}"`);
    
    // Ejemplo práctico: Detectar ENTER
    if (event.key === 'Enter') {
        alert('¡Presionaste ENTER!');
    }
});

/**
 * ==========================================
 * 9. FOCUS vs BLUR
 * ==========================================
 * 
 * ¿Cuándo usarlo?
 * - focus: Cuando el usuario entra en un input (hace clic o tabula).
 * - blur: Cuando el usuario sale del input.
 * 
 * Útil para validaciones, ayudas visuales o formateo de datos.
 */
const inputFocus = document.getElementById('input-focus');

inputFocus.addEventListener('focus', (event) => {
    event.target.style.backgroundColor = '#e0f2fe'; // Azul muy claro
    event.target.style.borderColor = '#0284c7'; // Azul fuerte
    log('Evento: FOCUS (Entraste al campo)');
});

inputFocus.addEventListener('blur', (event) => {
    event.target.style.backgroundColor = 'white';
    event.target.style.borderColor = '#ccc';
    log('Evento: BLUR (Saliste del campo)');
});

/**
 * ==========================================
 * 10. EVENTOS DE VENTANA (RESIZE / SCROLL)
 * ==========================================
 * 
 * Estos eventos se aplican a 'window'.
 * - resize: Cuando cambias el tamaño de la ventana del navegador.
 * - scroll: Cuando desplazas la página hacia arriba o abajo.
 */
const resResize = document.getElementById('res-resize');
const resScroll = document.getElementById('res-scroll');

let contadorResize = 0;

window.addEventListener('resize', () => {
    contadorResize++;
    resResize.textContent = contadorResize;
    // Nota: Este evento se dispara MUCHAS veces por segundo.
});

window.addEventListener('scroll', () => {
    // window.scrollY nos dice cuántos píxeles hemos bajado
    resScroll.textContent = Math.round(window.scrollY);
});

/**
 * ==========================================
 * 11. PORTAPAPELES (COPY / PASTE)
 * ==========================================
 * 
 * - copy: Cuando el usuario intenta copiar (Ctrl+C).
 * - paste: Cuando el usuario intenta pegar (Ctrl+V).
 * - cut: Cuando el usuario intenta cortar (Ctrl+X).
 * 
 * Podemos usar preventDefault() para bloquear estas acciones (aunque puede ser molesto para el usuario).
 */
const textoCopiar = document.getElementById('texto-copiar');
const inputPaste = document.getElementById('input-paste');

textoCopiar.addEventListener('copy', (event) => {
    event.preventDefault(); // Bloqueamos la copia
    alert('¡No puedes copiar este texto! (Evento copy prevenido)');
    log('Intento de COPIA bloqueado.');
});

inputPaste.addEventListener('paste', (event) => {
    // Podemos ver qué intentan pegar
    // event.clipboardData.getData('text')
    
    log('Evento PASTE detectado.');
    
    // Ejemplo: Bloquear pegado
    // event.preventDefault();
    // log('Pegado bloqueado.');
});

/**
 * ==========================================
 * 12. DOBLE CLICK (DBLCLICK)
 * ==========================================
 * 
 * ¿Cuándo usarlo?
 * Para acciones que requieren confirmación o evitar clicks accidentales.
 * Muy común para "editar" un elemento en sitio.
 */
const cajaDblClick = document.getElementById('caja-dblclick');

cajaDblClick.addEventListener('dblclick', () => {
    cajaDblClick.style.backgroundColor = '#fde047'; // Amarillo
    cajaDblClick.textContent = '¡Editando...!';
    log('Evento: dblclick (Doble Click)');
    
    setTimeout(() => {
        cajaDblClick.style.backgroundColor = 'transparent';
        cajaDblClick.textContent = 'Haz doble clic aquí';
    }, 2000);
});

/**
 * ==========================================
 * 13. CLICK DERECHO (CONTEXTMENU)
 * ==========================================
 * 
 * ¿Cuándo usarlo?
 * Para crear menús personalizados al hacer click derecho.
 * IMPRESCINDIBLE: Usar event.preventDefault() para que no salga el menú del navegador.
 */
const areaContext = document.getElementById('area-contextmenu');

areaContext.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // ¡IMPORTANTE!
    
    log('Evento: contextmenu (Click Derecho)');
    alert('¡Has hecho click derecho! Aquí podrías mostrar tu propio menú.');
});

/**
 * ==========================================
 * 14. CASO REAL: PANEL DE ADMINISTRACIÓN (DELEGACIÓN AVANZADA)
 * ==========================================
 * 
 * Este es el ejemplo "Master".
 * Tenemos una lista de usuarios. Cada uno tiene botones Ver, Editar, Eliminar.
 * NO ponemos 300 listeners. Ponemos 1 en el padre (#lista-usuarios).
 * 
 * Usamos:
 * 1. event.target.closest('.btn-action'): Para detectar si el click fue en un botón (o en su icono interior).
 * 2. dataset.action: Para saber QUÉ botón fue (ver, editar, eliminar).
 * 3. dataset.id: Para saber A QUIÉN afecta (ID del usuario).
 */
const listaUsuarios = document.getElementById('lista-usuarios');

listaUsuarios.addEventListener('click', (event) => {
    // 1. ¿Hicimos click en un botón de acción?
    // .closest() busca el ancestro más cercano (o el mismo elemento) que coincida.
    // Es mejor que .matches() si el botón tiene iconos <i> o <span> dentro.
    const boton = event.target.closest('.btn-action');
    
    // Si no fue en un botón, no hacemos nada
    if (!boton) return;
    
    // 2. Obtenemos los datos del botón (definidos en HTML como data-action y data-id)
    const accion = boton.dataset.action;
    const idUsuario = boton.dataset.id;
    
    // 3. Ejecutamos la lógica según la acción
    if (accion === 'ver') {
        log(`👁️ VIENDO detalles del usuario ${idUsuario}`);
        alert(`Abriendo perfil del usuario ${idUsuario}...`);
        
    } else if (accion === 'editar') {
        log(`✏️ EDITANDO usuario ${idUsuario}`);
        // Aquí abrirías un modal...
        
    } else if (accion === 'eliminar') {
        log(`🗑️ ELIMINANDO usuario ${idUsuario}`);
        
        if (confirm(`¿Seguro que quieres borrar al usuario ${idUsuario}?`)) {
            // Borramos la fila del DOM
            // boton.closest('.user-row') busca la fila completa contenedora
            const fila = boton.closest('.user-row');
            fila.remove();
            log(`Usuario ${idUsuario} eliminado del DOM.`);
        }
    }
});
