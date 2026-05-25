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

// Escenario 5: Hits rápidos
const sliderS5Coupled = document.getElementById("sliderS5Coupled");
const labelS5Coupled = document.getElementById("labelS5Coupled");
const hitCountCoupled = document.getElementById("hitCountCoupled");
const totalHitsCoupled = document.getElementById("totalHitsCoupled");
const hitLogCoupled = document.getElementById("hitLogCoupled");
const btnS5Coupled = document.getElementById("btnS5Coupled");
const btnS5ClearCoupled = document.getElementById("btnS5ClearCoupled");

// Escenario 6: Selector de colores
const colorPickerCoupled = document.getElementById("colorPickerCoupled");
const gradientBoxCoupled = document.getElementById("gradientBoxCoupled");
const colorCountCoupled = document.getElementById("colorCountCoupled");
const colorHistoryCoupled = document.getElementById("colorHistoryCoupled");
const btnS6ResetCoupled = document.getElementById("btnS6ResetCoupled");

// Escenario 7: Lista editable
const inputListCoupled = document.getElementById("inputListCoupled");
const btnAddListCoupled = document.getElementById("btnAddListCoupled");
const listContainerCoupled = document.getElementById("listContainerCoupled");
const btnS7ClearCoupled = document.getElementById("btnS7ClearCoupled");
const countCoupled = document.getElementById("countCoupled");
const verifyCountCoupled = document.getElementById("verifyCountCoupled");
const verifyStatusCoupled = document.getElementById("verifyStatusCoupled");

const HTML_STEP_1 = `<label class="form-label">Nombre Completo del Usuario:</label>
                     <input type="text" id="inputNombreCoupled" class="input" placeholder="Ej. Carlos Mendoza">`;
const HTML_STEP_2 = `<label class="form-label">Número Telefónico Corporativo:</label>
                     <input type="text" id="inputTelCoupled" class="input" placeholder="Ej. 600112233">`;

let coupledStep = 1;
let coupledLastHitTime = 0;

function reiniciarTodo() {
    barCoupled.style.width = "0px";
    lvlCoupled.innerText = "1";
    totalCoupled.innerText = "Total: 0.00 €";
    selectS2Coupled.value = "EUR";
    sliderScale.value = "100";
    labelScale.innerText = "100px";
    wrapperCoupled.style.width = "100px";
    previewCoupled.innerText = "null";
    coupledStep = 1;
    coupledLastHitTime = 0;
    totalDmgCoupled.innerText = "0";
    dummySpriteCoupled.innerText = "(*'-'*)";
    dummySpriteCoupled.style.color = "var(--text-dark)";
    sliderS5Coupled.value = "1";
    labelS5Coupled.innerText = "x1";
    hitCountCoupled.innerText = "0";
    totalHitsCoupled.innerText = "0";
    hitLogCoupled.innerText = "—";
    colorPickerCoupled.value = "#ff6b6b";
    gradientBoxCoupled.style.background = "linear-gradient(135deg, #ff6b6b, #ffa500)";
    colorCountCoupled.innerText = "0";
    colorHistoryCoupled.innerText = "—";
    listContainerCoupled.innerHTML = "";
    countCoupled.innerText = "0";
    verifyCountCoupled.innerText = "0";
    verifyStatusCoupled.innerText = " — sincronizado";
    inputListCoupled.value = "";
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
    btnPrevCoupled.disabled = false;
    btnNextCoupled.disabled = true;
    telemetryLog.innerText = "[DOM] Nodo contenedor sobreescrito con innerHTML. Los datos del input destruido se han perdido.";
});

btnPrevCoupled.addEventListener("click", () => {
    irAPaso1();
    telemetryLog.innerText = "[DOM] Contenedor de paso 1 recreado. El valor del teléfono se ha perdido irremediablemente.";
});

btnS3Coupled.addEventListener("click", () => {
    let nombreDetectado = document.getElementById("inputNombreCoupled") ? document.getElementById("inputNombreCoupled").value : "";
    let telDetectado = document.getElementById("inputTelCoupled") ? document.getElementById("inputTelCoupled").value : "";

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

// Escenario 5: Hits rápidos (acoplado - sin sincronización)
let hitLogCoupledData = []; // Mantenido solo para registro, el problema principal es la lectura del DOM

sliderS5Coupled.addEventListener("input", (e) => {
    const mult = parseInt(e.target.value);
    labelS5Coupled.innerText = `x${mult}`;
});

btnS5Coupled.addEventListener("click", () => {
    const mult = parseInt(sliderS5Coupled.value);
    const damage = 10 * mult;
    
    // Al introducir un leve retardo, los clicks rápidos leen el DOM antes de que se actualice, 
    // provocando desincronización y pérdida de golpes.
    setTimeout(() => {
        let currentTotal = parseInt(totalHitsCoupled.innerText) || 0;
        let currentCount = parseInt(hitCountCoupled.innerText) || 0;
        
        totalHitsCoupled.innerText = currentTotal + damage;
        hitCountCoupled.innerText = currentCount + 1;
        
        hitLogCoupledData.push(damage);
        hitLogCoupled.innerText = hitLogCoupledData.join(" + ");
        
        telemetryLog.innerText = `[DOM] Golpe registrado (+${damage}). Total en pantalla: ${currentTotal + damage}. Golpes leídos: ${currentCount + 1}`;
    }, 300);
});

btnS5ClearCoupled.addEventListener("click", () => {
    hitCountCoupled.innerText = "0";
    totalHitsCoupled.innerText = "0";
    hitLogCoupled.innerText = "—";
    hitLogCoupledData = [];
    telemetryLog.innerText = "[DOM] Contador de golpes restablecido en el DOM.";
});

// Escenario 6: Selector de colores (acoplado puro)

colorPickerCoupled.addEventListener("change", (e) => {
    const color = e.target.value;
    const gradient = `linear-gradient(135deg, ${color}, #ffa500)`;
    gradientBoxCoupled.style.background = gradient;
    
    // Lee y manipula el string visual directamente
    let history = colorHistoryCoupled.innerText;
    if (history === "—" || history === "") {
        history = color;
    } else {
        history += ", " + color;
    }
    
    colorHistoryCoupled.innerText = history;
    colorCountCoupled.innerText = history.split(",").length;
    telemetryLog.innerText = `[DOM] Color modificado leyendo el DOM: ${color}`;
});

btnS6ResetCoupled.addEventListener("click", () => {
    colorPickerCoupled.value = "#ff6b6b";
    const gradient = "linear-gradient(135deg, #ff6b6b, #ffa500)";
    gradientBoxCoupled.style.background = gradient;
    colorHistoryCoupled.innerText = "—";
    colorCountCoupled.innerText = "0";
    telemetryLog.innerText = "[DOM] Historial y color restablecidos en el DOM.";
});

// Escenario 7: Lista editable (acoplada)
btnAddListCoupled.addEventListener("click", () => {
    const texto = inputListCoupled.value.trim();
    if (!texto) {
        telemetryLog.innerText = "[DOM] Campo vacío. No se añadió elemento.";
        return;
    }

    const li = document.createElement("li");
    li.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border-color); font-size: 0.9rem;";
    li.innerHTML = `<span>${texto}</span><button class="btn-delete-coupled" style="background: none; border: none; color: var(--flat-red); cursor: pointer; font-weight: bold; padding: 0 4px;">×</button>`;
    
    const deleteBtn = li.querySelector(".btn-delete-coupled");
    deleteBtn.addEventListener("click", () => {
        li.style.opacity = "0.4"; // Simula animación o borrado asíncrono
        setTimeout(() => {
            li.remove();
            // Al leer la longitud sincronamente tras el borrado diferido, si borras varios rápido, esto falla.
            countCoupled.innerText = listContainerCoupled.children.length;
            verifyCountCoupled.innerText = listContainerCoupled.children.length;
            telemetryLog.innerText = `[DOM] Elemento eliminado directamente del DOM. Total: ${listContainerCoupled.children.length}`;
        }, 400);
    });

    listContainerCoupled.appendChild(li);
    countCoupled.innerText = listContainerCoupled.children.length;
    verifyCountCoupled.innerText = listContainerCoupled.children.length;
    inputListCoupled.value = "";
    telemetryLog.innerText = `[DOM] Elemento añadido directamente al DOM. Total: ${listContainerCoupled.children.length}`;
});

btnS7ClearCoupled.addEventListener("click", () => {
    listContainerCoupled.innerHTML = "";
    countCoupled.innerText = "0";
    verifyCountCoupled.innerText = "0";
    verifyStatusCoupled.innerText = " — sincronizado";
    telemetryLog.innerText = "[DOM] Lista vaciada en el DOM.";
});

btnResetAll.addEventListener("click", reiniciarTodo);
reiniciarTodo();