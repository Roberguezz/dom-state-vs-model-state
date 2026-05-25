const telemetryLog = document.getElementById("telemetryMsg");

// Escenario 1: Control de escala física
const btnS1Coupled = document.getElementById("btnS1Coupled");
const barCoupled = document.getElementById("barCoupled");
const lvlCoupled = document.getElementById("lvlCoupled");
const sliderScale = document.getElementById("sliderScale");
const labelScale = document.getElementById("labelScale");
const wrapperCoupled = document.getElementById("wrapperCoupled");

document.getElementById("resetS1").addEventListener("click", () => {
    barCoupled.style.width = "0px";
    lvlCoupled.innerText = "1";
    sliderScale.value = "100";
    labelScale.innerText = "100px";
    wrapperCoupled.style.width = "100px";
    telemetryLog.innerText = "[DOM] Escenario 1 restablecido.";
});

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

// Escenario 2: Conversión dinámica de divisas
const btnS2Coupled = document.getElementById("btnS2Coupled");
const selectS2Coupled = document.getElementById("selectS2Coupled");
const totalCoupled = document.getElementById("totalCoupled");

document.getElementById("resetS2").addEventListener("click", () => {
    totalCoupled.innerText = "Total: 0.00 €";
    selectS2Coupled.value = "EUR";
    telemetryLog.innerText = "[DOM] Escenario 2 restablecido.";
});

selectS2Coupled.addEventListener("change", (e) => {
    const divisa = e.target.value;
    let texto = totalCoupled.innerText;
    
    let limpio = parseFloat(texto.replace(" €", ""));

    if (isNaN(limpio)) {
        totalCoupled.innerText = "NaN";
        telemetryLog.innerText = "[DOM] ERROR: No se pudo parsear el texto de la pantalla. Se produjo un NaN.";
        return;
    }

    if (divisa === "USD") totalCoupled.innerText = "Total: $ " + (limpio * 1.10).toFixed(2);
    else if (divisa === "JPY") totalCoupled.innerText = "Total: ¥ " + Math.floor(limpio * 160);
    else if (divisa === "EUR") totalCoupled.innerText = "Total: " + limpio.toFixed(2) + " €";
    
    telemetryLog.innerText = `[DOM] Divisa modificada directamente en el texto de la pantalla a: ${divisa}`;
});

btnS2Coupled.addEventListener("click", () => {
    let texto = totalCoupled.innerText;
    let limpio = parseFloat(texto.replace(" €", "").replace("$ ", "").replace("¥ ", "").replace("Total: ", ""));

    if (isNaN(limpio)) {
        telemetryLog.innerText = "[DOM] ERROR: Operación cancelada. El total de la pantalla contiene un error NaN.";
        return;
    }

    let total = limpio + 10.00;
    let div = selectS2Coupled.value;
    
    if (div === "EUR") totalCoupled.innerText = "Total: " + total.toFixed(2) + " €";
    else if (div === "USD") totalCoupled.innerText = "Total: $ " + total.toFixed(2);
    else if (div === "JPY") totalCoupled.innerText = "Total: ¥ " + Math.floor(total);
    
    telemetryLog.innerText = `[DOM] Texto de saldo incrementado en la pantalla (+10.00 en divisa activa).`;
});

// Escenario 3: Persistencia e inputs dinámicos
const formContainerCoupled = document.getElementById("formContainerCoupled");
const btnPrevCoupled = document.getElementById("btnPrevCoupled");
const btnNextCoupled = document.getElementById("btnNextCoupled");
const btnS3Coupled = document.getElementById("btnS3Coupled");
const previewCoupled = document.getElementById("previewCoupled");

const HTML_STEP_1 = `<label class="form-label">Nombre Completo del Usuario:</label>
                     <input type="text" id="inputNombreCoupled" class="input" placeholder="Ej. Carlos Mendoza">`;
const HTML_STEP_2 = `<label class="form-label">Número Telefónico Corporativo:</label>
                     <input type="text" id="inputTelCoupled" class="input" placeholder="Ej. 600112233">`;

let coupledStep = 1;

function irAPaso1() {
    coupledStep = 1;
    formContainerCoupled.innerHTML = HTML_STEP_1;
    btnPrevCoupled.disabled = true;
    btnNextCoupled.disabled = false;
}

document.getElementById("resetS3").addEventListener("click", () => {
    previewCoupled.innerText = "null";
    irAPaso1();
    telemetryLog.innerText = "[DOM] Escenario 3 restablecido.";
});

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

// Escenario 4: Combate RPG acoplado al DOM
const btnS4Coupled = document.getElementById("btnS4Coupled");
const btnS4ClearCoupled = document.getElementById("btnS4ClearCoupled");
const totalDmgCoupled = document.getElementById("totalDmgCoupled");
const dummySpriteCoupled = document.getElementById("dummySpriteCoupled");
let coupledLastHitTime = 0;

document.getElementById("resetS4").addEventListener("click", () => {
    coupledLastHitTime = 0;
    totalDmgCoupled.innerText = "0";
    totalDmgCoupled.style.color = "var(--text-dark)";
    dummySpriteCoupled.innerText = "(*'-'*)";
    dummySpriteCoupled.style.color = "var(--text-dark)";
    telemetryLog.innerText = "[DOM] Escenario 4 restablecido.";
});

btnS4Coupled.addEventListener("click", () => {
    const currentTime = Date.now();
    const comboActive = (currentTime - coupledLastHitTime) < 1000;
    coupledLastHitTime = currentTime;

    let textVal = totalDmgCoupled.innerText;
    let currentDmg = parseFloat(textVal);

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
    document.getElementById("resetS4").click();
});

// Escenario 5: Sistema de Niveles (Atributos DOM vs Tipos de datos)
const heroLevelCoupled = document.getElementById("heroLevelCoupled");
const btnS5Coupled = document.getElementById("btnS5Coupled");

document.getElementById("resetS5").addEventListener("click", () => {
    heroLevelCoupled.setAttribute("data-level", "1");
    heroLevelCoupled.innerText = "Nivel: 1";
    telemetryLog.innerText = "[DOM] Escenario 5 restablecido.";
});

btnS5Coupled.addEventListener("click", () => {
    // Lee del atributo del DOM, obteniendo un String "1"
    let lvl = heroLevelCoupled.getAttribute("data-level");
    
    // "1" + 1 concatena, dando "11"
    let nextLvl = lvl + 1; 
    
    heroLevelCoupled.setAttribute("data-level", nextLvl);
    heroLevelCoupled.innerText = "Nivel: " + nextLvl;
    
    telemetryLog.innerText = `[DOM] ERROR DE TIPOS: "1" + 1 generó "${nextLvl}". El nivel saltó de forma corrupta.`;
});

// Escenario 6: Inventario de Botín (Bug visual de parseo)
const lootCoupled = document.getElementById("lootCoupled");
const weightCoupled = document.getElementById("weightCoupled");
const btnS6AddCoupled = document.getElementById("btnS6AddCoupled");
const btnS6EnchantCoupled = document.getElementById("btnS6EnchantCoupled");

document.getElementById("resetS6").addEventListener("click", () => {
    lootCoupled.innerHTML = `
        <li>5 kg - Espada Larga</li>
        <li>3 kg - Escudo de Madera</li>
    `;
    weightCoupled.innerText = "8";
    telemetryLog.innerText = "[DOM] Escenario 6 restablecido.";
});

btnS6AddCoupled.addEventListener("click", () => {
    const li = document.createElement("li");
    li.innerText = "1 kg - Manzana";
    lootCoupled.appendChild(li);
    
    let total = 0;
    Array.from(lootCoupled.children).forEach(item => {
        total += parseInt(item.innerText);
    });
    weightCoupled.innerText = total;
    telemetryLog.innerText = `[DOM] Elemento añadido. Peso recalculado leyendo el DOM: ${total} kg`;
});

btnS6EnchantCoupled.addEventListener("click", () => {
    Array.from(lootCoupled.children).forEach(item => {
        if (!item.innerText.startsWith("✨")) {
            item.innerText = "✨ " + item.innerText;
        }
    });
    
    let total = 0;
    Array.from(lootCoupled.children).forEach(item => {
        total += parseInt(item.innerText);
    });
    weightCoupled.innerText = total;
    telemetryLog.innerText = `[DOM] ERROR: Encantamiento aplicado. parseInt() falló al encontrar '✨', resultando en NaN.`;
});

// Escenario 7: Invocación de Esbirros (Nodos fantasma y animaciones)
const countCoupled = document.getElementById("countCoupled");
const minionZoneCoupled = document.getElementById("minionZoneCoupled");
const btnS7InvokeCoupled = document.getElementById("btnS7InvokeCoupled");
const btnS7BanishCoupled = document.getElementById("btnS7BanishCoupled");

document.getElementById("resetS7").addEventListener("click", () => {
    minionZoneCoupled.innerHTML = "";
    countCoupled.innerText = "0";
    telemetryLog.innerText = "[DOM] Escenario 7 restablecido.";
});

btnS7InvokeCoupled.addEventListener("click", () => {
    // BUG ACERVO: Lee la cantidad de nodos físicos en el DOM (incluyendo los que están desapareciendo)
    if (minionZoneCoupled.children.length >= 3) {
        telemetryLog.innerText = "[DOM] BLOQUEADO: ¡Límite de 3 esbirros alcanzado! (Nodos fantasma impiden invocar)";
        return;
    }
    
    const minion = document.createElement("div");
    minion.className = "minion-item";
    minion.innerText = "💀";
    minion.style.fontSize = "2rem";
    
    minionZoneCoupled.appendChild(minion);
    countCoupled.innerText = minionZoneCoupled.children.length;
    telemetryLog.innerText = `[DOM] Esbirro invocado. Total nodos: ${minionZoneCoupled.children.length}`;
});

btnS7BanishCoupled.addEventListener("click", () => {
    Array.from(minionZoneCoupled.children).forEach(m => {
        if (!m.classList.contains("minion-fade")) {
            m.classList.add("minion-fade");
            setTimeout(() => {
                m.remove();
                countCoupled.innerText = minionZoneCoupled.children.length;
            }, 2000);
        }
    });
    telemetryLog.innerText = "[DOM] Desterrando... Tarda 2 segundos en limpiar los nodos.";
});

irAPaso1();