const telemetryLog = document.getElementById("telemetryMsg");

// Escenario 1: Control de escala física
const btnS1Mvc = document.getElementById("btnS1Mvc");
const barMvc = document.getElementById("barMvc");
const lvlMvc = document.getElementById("lvlMvc");
const wrapperMvc = document.getElementById("wrapperMvc");

// Escenario 2: Conversión dinámica de divisas
const btnS2Mvc = document.getElementById("btnS2Mvc");
const selectS2Mvc = document.getElementById("selectS2Mvc");
const totalMvc = document.getElementById("totalMvc");

// Escenario 3: Persistencia e inputs dinámicos
const formContainerMvc = document.getElementById("formContainerMvc");
const btnPrevMvc = document.getElementById("btnPrevMvc");
const btnNextMvc = document.getElementById("btnNextMvc");
const btnS3Mvc = document.getElementById("btnS3Mvc");
const previewMvc = document.getElementById("previewMvc");

// Escenario 4: Combate RPG desacoplado (MVC)
const btnS4Mvc = document.getElementById("btnS4Mvc");
const btnS4ClearMvc = document.getElementById("btnS4ClearMvc");
const totalDmgMvc = document.getElementById("totalDmgMvc");
const dummySpriteMvc = document.getElementById("dummySpriteMvc");

// Escenario 5: Sistema de Niveles
const btnS5Mvc = document.getElementById("btnS5Mvc");
const heroLevelMvc = document.getElementById("heroLevelMvc");

// Escenario 6: Inventario de Botín
const lootMvc = document.getElementById("lootMvc");
const weightMvc = document.getElementById("weightMvc");
const btnS6AddMvc = document.getElementById("btnS6AddMvc");
const btnS6EnchantMvc = document.getElementById("btnS6EnchantMvc");

// Escenario 7: Invocación de Esbirros
const countMvc = document.getElementById("countMvc");
const minionZoneMvc = document.getElementById("minionZoneMvc");
const graveyardMvc = document.getElementById("graveyardMvc");
const btnS7InvokeMvc = document.getElementById("btnS7InvokeMvc");
const btnS7BanishMvc = document.getElementById("btnS7BanishMvc");

const HTML_STEP_1 = `<label class="form-label">Nombre Completo del Usuario:</label>
                     <input type="text" id="inputNombreMvc" name="nombre" class="input" placeholder="Ej. Carlos Mendoza">`;
const HTML_STEP_2 = `<label class="form-label">Número Telefónico Corporativo:</label>
                     <input type="text" id="inputTelMvc" name="telefono" class="input" placeholder="Ej. 600112233">`;

// MODELO: Estado en memoria
let appState = getInitialState();

function getInitialState() {
    return {
        s1: { progreso: 0, nivel: 1 },
        s2: { saldoEuros: 0.0, divisa: "EUR" },
        s3: { pasoActual: 1, formulario: { nombre: "", telefono: "" } },
        s4: { damage: 0, lastHitTime: 0, isCombo: false },
        s5: { level: 1 },
        s6: { loot: [{ name: "Espada Larga", weight: 5, enchanted: false }, { name: "Escudo de Madera", weight: 3, enchanted: false }] },
        s7: { minions: [] },
        tasas: { EUR: 1.0, USD: 1.10, JPY: 160.0 }
    };
}

// Resets
document.getElementById("resetS1").addEventListener("click", () => { appState.s1 = getInitialState().s1; renderizar(); });
document.getElementById("resetS2").addEventListener("click", () => { appState.s2 = getInitialState().s2; selectS2Mvc.value = "EUR"; renderizar(); });
document.getElementById("resetS3").addEventListener("click", () => { appState.s3 = getInitialState().s3; previewMvc.innerText="null"; renderizar(); });
document.getElementById("resetS4").addEventListener("click", () => { appState.s4 = getInitialState().s4; renderizar(); });
document.getElementById("resetS5").addEventListener("click", () => { appState.s5 = getInitialState().s5; renderizar(); });
document.getElementById("resetS6").addEventListener("click", () => { appState.s6 = getInitialState().s6; renderizar(); });
document.getElementById("resetS7").addEventListener("click", () => { 
    appState.s7 = getInitialState().s7; 
    graveyardMvc.innerHTML = ""; 
    renderizar(); 
});

// VISTA: Actualización del DOM a partir del Modelo
function renderizar() {
    // Escenario 1
    lvlMvc.innerText = appState.s1.nivel;
    barMvc.style.width = appState.s1.progreso + "%";

    // Escenario 2
    const divisa = appState.s2.divisa;
    const saldoCalculado = appState.s2.saldoEuros * appState.tasas[divisa];
    
    if (divisa === "EUR") totalMvc.innerText = "Total: " + saldoCalculado.toFixed(2) + " €";
    else if (divisa === "USD") totalMvc.innerText = "Total: $ " + saldoCalculado.toFixed(2);
    else if (divisa === "JPY") totalMvc.innerText = "Total: ¥ " + Math.floor(saldoCalculado);

    // Escenario 3
    if (appState.s3.pasoActual === 1) {
        formContainerMvc.innerHTML = HTML_STEP_1;
        document.getElementById("inputNombreMvc").value = appState.s3.formulario.nombre;
        btnPrevMvc.disabled = true;
        btnNextMvc.disabled = false;
    } else {
        formContainerMvc.innerHTML = HTML_STEP_2;
        document.getElementById("inputTelMvc").value = appState.s3.formulario.telefono;
        btnPrevMvc.disabled = false;
        btnNextMvc.disabled = true;
    }

    // Escenario 4
    if (appState.s4.isCombo) {
        totalDmgMvc.innerText = `¡COMBO! ${appState.s4.damage}`;
        dummySpriteMvc.innerText = "(*>.<*)";
        dummySpriteMvc.style.color = "var(--flat-green)";
    } else {
        totalDmgMvc.innerText = appState.s4.damage;
        dummySpriteMvc.innerText = appState.s4.damage > 0 ? "(*o* )" : "(*'-'*)";
        dummySpriteMvc.style.color = "var(--text-dark)";
    }

    // Escenario 5: Niveles
    heroLevelMvc.innerText = "Nivel: " + appState.s5.level;

    // Escenario 6: Inventario
    lootMvc.innerHTML = appState.s6.loot.map(item => {
        const prefix = item.enchanted ? "✨ " : "";
        return `<li>${prefix}${item.weight} kg - ${item.name}</li>`;
    }).join("");
    
    let totalWeight = appState.s6.loot.reduce((acc, item) => acc + item.weight, 0);
    weightMvc.innerText = totalWeight;

    // Escenario 7: Esbirros
    countMvc.innerText = appState.s7.minions.length;
    minionZoneMvc.innerHTML = appState.s7.minions.map(() => `<div class="minion-item" style="font-size: 2rem;">💀</div>`).join("");
}

// CONTROLADOR: Gestores de eventos
btnS1Mvc.addEventListener("click", () => {
    appState.s1.progreso += 20;
    if (appState.s1.progreso >= 100) {
        appState.s1.nivel += 1;
        appState.s1.progreso = 0;
        telemetryLog.innerText = "[MVC] Nivel incrementado en el Modelo. Barra reseteada a 0%.";
    } else {
        telemetryLog.innerText = `[MVC] Progreso actualizado en el Modelo: ${appState.s1.progreso}/100`;
    }
    renderizar();
});

selectS2Mvc.addEventListener("change", (e) => {
    appState.s2.divisa = e.target.value;
    telemetryLog.innerText = `[MVC] Divisa cambiada en el Modelo a: ${appState.s2.divisa}`;
    renderizar();
});

btnS2Mvc.addEventListener("click", () => {
    appState.s2.saldoEuros += 10.00;
    telemetryLog.innerText = `[MVC] Saldo incrementado en el Modelo (+10.00 EUR). Total en memoria: ${appState.s2.saldoEuros.toFixed(2)} EUR`;
    renderizar();
});

formContainerMvc.addEventListener("input", (e) => {
    const campo = e.target.name; 
    appState.s3.formulario[campo] = e.target.value;
});

btnNextMvc.addEventListener("click", () => {
    appState.s3.pasoActual = 2;
    telemetryLog.innerText = "[MVC] Avanzado a Paso 2. Datos leídos desde el Modelo en memoria.";
    renderizar();
});

btnPrevMvc.addEventListener("click", () => {
    appState.s3.pasoActual = 1;
    telemetryLog.innerText = "[MVC] Regresado a Paso 1. Datos cargados desde el Modelo en memoria.";
    renderizar();
});

btnS3Mvc.addEventListener("click", () => {
    previewMvc.innerText = JSON.stringify(appState.s3.formulario);
    telemetryLog.innerText = "[MVC] Formulario exportado desde el Modelo.";
});

btnS4Mvc.addEventListener("click", () => {
    const currentTime = Date.now();
    const comboActive = (currentTime - appState.s4.lastHitTime) < 1000;
    appState.s4.lastHitTime = currentTime;

    let baseDamage = 20;
    let hitDamage = comboActive ? (baseDamage * 2) : baseDamage;

    appState.s4.damage += hitDamage;
    appState.s4.isCombo = comboActive;

    telemetryLog.innerText = comboActive 
        ? `[MVC] ¡Golpe de combo! Daño de ataque duplicado (+40) y acumulado en memoria.` 
        : `[MVC] Golpe registrado en el Modelo (+20). Total en memoria: ${appState.s4.damage}`;

    renderizar();
});

btnS4ClearMvc.addEventListener("click", () => {
    document.getElementById("resetS4").click();
});

// Escenario 5
btnS5Mvc.addEventListener("click", () => {
    appState.s5.level += 1;
    telemetryLog.innerText = `[MVC] Suma matemática (Number): 1 + 1 = 2. Nivel en memoria: ${appState.s5.level}`;
    renderizar();
});

// Escenario 6
btnS6AddMvc.addEventListener("click", () => {
    appState.s6.loot.push({ name: "Manzana", weight: 1, enchanted: false });
    telemetryLog.innerText = `[MVC] Objeto añadido al array del Modelo. Peso recalculado en base a datos reales.`;
    renderizar();
});

btnS6EnchantMvc.addEventListener("click", () => {
    appState.s6.loot.forEach(item => item.enchanted = true);
    telemetryLog.innerText = `[MVC] Encantamiento visual activado en el Modelo. No afecta al cálculo matemático de peso.`;
    renderizar();
});

// Escenario 7
btnS7InvokeMvc.addEventListener("click", () => {
    if (appState.s7.minions.length >= 3) {
        telemetryLog.innerText = "[MVC] BLOQUEADO: Límite de 3 esbirros alcanzado en el Modelo.";
        return;
    }
    appState.s7.minions.push(Date.now());
    telemetryLog.innerText = `[MVC] Esbirro añadido al array puro. Total: ${appState.s7.minions.length}`;
    renderizar();
});

btnS7BanishMvc.addEventListener("click", () => {
    // Traslada los esbirros actuales visualmente al cementerio para que se desvanezcan
    const ghosts = Array.from(minionZoneMvc.children);
    ghosts.forEach(g => {
        g.classList.add("minion-fade");
        graveyardMvc.appendChild(g);
        setTimeout(() => g.remove(), 2000);
    });
    
    // El modelo queda vacío y disponible de inmediato
    appState.s7.minions = [];
    telemetryLog.innerText = "[MVC] Array de esbirros vaciado al instante. ¡Puedes seguir invocando mientras los muertos se desvanecen!";
    renderizar();
});

renderizar();