const telemetryLog = document.getElementById("telemetryMsg");
const btnResetAll = document.getElementById("btnResetAll");

// Escenario 1: Control de escala física
const btnS1Coupled = document.getElementById("btnS1Coupled");
const barCoupled = document.getElementById("barCoupled");
const lvlCoupled = document.getElementById("lvlCoupled");
const sliderScale = document.getElementById("sliderScale");
const labelScale = document.getElementById("labelScale");
const wrapperCoupled = document.getElementById("wrapperCoupled");

// Escenario 2: Conversión dinámica de divisas
const btnS2Coupled = document.getElementById("btnS2Coupled");
const selectS2Coupled = document.getElementById("selectS2Coupled");
const totalCoupled = document.getElementById("totalCoupled");

// Escenario 3: Persistencia e inputs dinámicos
const formContainerCoupled = document.getElementById("formContainerCoupled");
const btnPrevCoupled = document.getElementById("btnPrevCoupled");
const btnNextCoupled = document.getElementById("btnNextCoupled");
const btnS3Coupled = document.getElementById("btnS3Coupled");
const previewCoupled = document.getElementById("previewCoupled");

// Escenario 4: Combate RPG acoplado al DOM
const btnS4Coupled = document.getElementById("btnS4Coupled");
const btnS4ClearCoupled = document.getElementById("btnS4ClearCoupled");
const totalDmgCoupled = document.getElementById("totalDmgCoupled");
const dummySpriteCoupled = document.getElementById("dummySpriteCoupled");

const HTML_STEP_1 = `<label class="form-label">Nombre Completo del Usuario:</label>
                     <input type="text" id="inputNombreCoupled" class="input" placeholder="Ej. Carlos Mendoza">`;
const HTML_STEP_2 = `<label class="form-label">Número Telefónico Corporativo:</label>
                     <input type="text" id="inputTelCoupled" class="input" placeholder="Ej. 600112233">`;

let coupledStep = 1;
let tempTelefono = ""; 
let coupledLastHitTime = 0;

function reiniciarTodo() {
    barCoupled.style.width = "0px";
    lvlCoupled.innerText = "1";
    totalCoupled.innerText = "0.00 €";
    selectS2Coupled.value = "EUR";
    sliderScale.value = "100";
    labelScale.innerText = "100px";
    wrapperCoupled.style.width = "100px";
    previewCoupled.innerText = "null";
    coupledStep = 1;
    tempTelefono = "";
    coupledLastHitTime = 0;
    totalDmgCoupled.innerText = "0";
    dummySpriteCoupled.innerText = "(*'-'*)";
    dummySpriteCoupled.style.color = "var(--text-dark)";
    irAPaso1();
}

// Escenario 1: Incremento acoplado al ancho físico (px) de la barra
btnS1Coupled.addEventListener("click", () => {
    let px = parseInt(barCoupled.style.width) || 0;
    let nuevo = px + 20;

    if (nuevo >= 100) {
        lvlCoupled.innerText = parseInt(lvlCoupled.innerText) + 1;
        nuevo = 0;
        telemetryLog.innerText = "[DOM] Nivel incrementado. Barra física del DOM restablecida a 0px.";
    } else {
        telemetryLog.innerText = `[DOM] Ancho de la barra modificado directamente en el DOM a: ${nuevo}px`;
    }
    barCoupled.style.width = nuevo + "px";
});

// Escenario 2: Lectura de estado desde strings formateados en pantalla (Data Scraping)
selectS2Coupled.addEventListener("change", (e) => {
    const divisa = e.target.value;
    let texto = totalCoupled.innerText;
    
    // El replace de " €" falla si el texto contiene "$" o "¥", provocando un error NaN
    let limpio = parseFloat(texto.replace(" €", ""));

    if (isNaN(limpio)) {
        totalCoupled.innerText = "NaN";
        telemetryLog.innerText = "[DOM] ERROR: No se pudo parsear el texto de la pantalla. Se produjo un NaN.";
        return;
    }

    if (divisa === "USD") totalCoupled.innerText = "$ " + (limpio * 1.10).toFixed(2);
    else if (divisa === "JPY") totalCoupled.innerText = "¥ " + Math.floor(limpio * 160);
    else if (divisa === "EUR") totalCoupled.innerText = limpio.toFixed(2) + " €";
    
    telemetryLog.innerText = `[DOM] Divisa modificada directamente en el texto de la pantalla a: ${divisa}`;
});

btnS2Coupled.addEventListener("click", () => {
    let texto = totalCoupled.innerText;
    let limpio = parseFloat(texto.replace(" €", "").replace("$ ", "").replace("¥ ", ""));

    if (isNaN(limpio)) {
        telemetryLog.innerText = "[DOM] ERROR: Operación cancelada. El total de la pantalla contiene un error NaN.";
        return;
    }

    let total = limpio + 10.00;
    let div = selectS2Coupled.value;
    
    if (div === "EUR") totalCoupled.innerText = total.toFixed(2) + " €";
    else if (div === "USD") totalCoupled.innerText = "$ " + total.toFixed(2);
    else if (div === "JPY") totalCoupled.innerText = "¥ " + Math.floor(total);
    
    telemetryLog.innerText = `[DOM] Texto de saldo incrementado en la pantalla (+10.00 en divisa activa).`;
});

// Escenario 3: Destrucción física de nodos y pérdida de variables de entrada
function irAPaso1() {
    coupledStep = 1;
    formContainerCoupled.innerHTML = HTML_STEP_1;
    btnPrevCoupled.disabled = true;
    btnNextCoupled.disabled = false;
}

btnNextCoupled.addEventListener("click", () => {
    coupledStep = 2;
    formContainerCoupled.innerHTML = HTML_STEP_2;
    document.getElementById("inputTelCoupled").value = tempTelefono;
    btnPrevCoupled.disabled = false;
    btnNextCoupled.disabled = true;
    telemetryLog.innerText = "[DOM] Nodo contenedor sobreescrito con innerHTML. Los datos del input destruido se han perdido.";
});

btnPrevCoupled.addEventListener("click", () => {
    tempTelefono = document.getElementById("inputTelCoupled").value;
    irAPaso1();
    telemetryLog.innerText = "[DOM] Contenedor de paso 1 recreado. El valor del nombre se ha perdido al no estar guardado.";
});

btnS3Coupled.addEventListener("click", () => {
    let nombreDetectado = document.getElementById("inputNombreCoupled") ? document.getElementById("inputNombreCoupled").value : "";
    let telDetectado = document.getElementById("inputTelCoupled") ? document.getElementById("inputTelCoupled").value : tempTelefono;

    let payload = { nombre: nombreDetectado, telefono: telDetectado };
    previewCoupled.innerText = JSON.stringify(payload);
    telemetryLog.innerText = "[DOM] Datos extraídos realizando consultas de nodos activos directamente en el DOM.";
});

// Escenario 4: Combate RPG acoplado al DOM (Falla con NaN por el prefijo de combo)
btnS4Coupled.addEventListener("click", () => {
    const currentTime = Date.now();
    const comboActive = (currentTime - coupledLastHitTime) < 1000;
    coupledLastHitTime = currentTime;

    // Lee el marcador de daño actual directamente del DOM
    let textVal = totalDmgCoupled.innerText;
    let currentDmg = parseFloat(textVal);

    // Si la pantalla ya muestra un error NaN, abortar
    if (isNaN(currentDmg)) {
        telemetryLog.innerText = "[DOM] ERROR: Operación fallida. El total en el DOM ya se encuentra corrupto con NaN.";
        totalDmgCoupled.style.color = "var(--flat-red)";
        dummySpriteCoupled.innerText = "x_x";
        dummySpriteCoupled.style.color = "var(--flat-red)";
        return;
    }

    let baseDamage = 20;

    if (comboActive) {
        let addedDamage = baseDamage * 2;
        let newTotal = currentDmg + addedDamage;
        
        // Escribe el string formateado directamente en el DOM
        totalDmgCoupled.innerText = `¡COMBO! ${newTotal}`;
        dummySpriteCoupled.innerText = "(*>.<*)";
        dummySpriteCoupled.style.color = "var(--flat-red)";
        
        telemetryLog.innerText = "[DOM] ¡Golpe de combo! Marcador en pantalla actualizado a string con texto.";
    } else {
        let newTotal = currentDmg + baseDamage;
        totalDmgCoupled.innerText = newTotal;
        dummySpriteCoupled.innerText = "(*o* )";
        dummySpriteCoupled.style.color = "var(--text-dark)";
        
        telemetryLog.innerText = `[DOM] Golpe registrado en pantalla. Total actualizado a: ${newTotal}`;
    }
});

btnS4ClearCoupled.addEventListener("click", () => {
    coupledLastHitTime = 0;
    totalDmgCoupled.innerText = "0";
    totalDmgCoupled.style.color = "var(--text-dark)";
    dummySpriteCoupled.innerText = "(*'-'*)";
    dummySpriteCoupled.style.color = "var(--text-dark)";
    telemetryLog.innerText = "[DOM] Muñeco de pruebas restablecido en el DOM. Marcador reseteado a 0.";
});

btnResetAll.addEventListener("click", reiniciarTodo);
reiniciarTodo();