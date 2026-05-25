const telemetryLog = document.getElementById("telemetryMsg");
const btnResetAll = document.getElementById("btnResetAll");

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

const HTML_STEP_1 = `<label class="form-label">Nombre Completo del Usuario:</label>
                     <input type="text" id="inputNombreMvc" name="nombre" class="input" placeholder="Ej. Carlos Mendoza">`;
const HTML_STEP_2 = `<label class="form-label">Número Telefónico Corporativo:</label>
                     <input type="text" id="inputTelMvc" name="telefono" class="input" placeholder="Ej. 600112233">`;

// MODELO: Estado en memoria
const appState = {
    s1: { progreso: 0, nivel: 1 },
    s2: { saldoEuros: 0.0, divisa: "EUR" },
    s3: { pasoActual: 1, formulario: { nombre: "", telefono: "" } },
    s4: { damage: 0, lastHitTime: 0, isCombo: false },
    tasas: { EUR: 1.0, USD: 1.10, JPY: 160.0 }
};

function resetearEstructura() {
    appState.s1 = { progreso: 0, nivel: 1 };
    appState.s2 = { saldoEuros: 0.0, divisa: "EUR" };
    appState.s3 = { pasoActual: 1, formulario: { nombre: "", telefono: "" } };
    appState.s4 = { damage: 0, lastHitTime: 0, isCombo: false };
    selectS2Mvc.value = "EUR";
    wrapperMvc.style.width = "100px";
    previewMvc.innerText = "null";
    renderizar();
}

// VISTA: Actualización del DOM a partir del Modelo
function renderizar() {
    // Escenario 1
    lvlMvc.innerText = appState.s1.nivel;
    barMvc.style.width = appState.s1.progreso + "%";

    // Escenario 2
    const divisa = appState.s2.divisa;
    const saldoCalculado = appState.s2.saldoEuros * appState.tasas[divisa];
    
    if (divisa === "EUR") totalMvc.innerText = saldoCalculado.toFixed(2) + " €";
    else if (divisa === "USD") totalMvc.innerText = "$ " + saldoCalculado.toFixed(2);
    else if (divisa === "JPY") totalMvc.innerText = "¥ " + Math.floor(saldoCalculado);

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

// Sincronización del formulario con el Modelo
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

// Controladores del Escenario 4 (MVC)
btnS4Mvc.addEventListener("click", () => {
    const currentTime = Date.now();
    const comboActive = (currentTime - appState.s4.lastHitTime) < 1000;
    appState.s4.lastHitTime = currentTime;

    let baseDamage = 20;
    let hitDamage = comboActive ? (baseDamage * 2) : baseDamage;

    // Mutamos la variable numérica en memoria de forma segura
    appState.s4.damage += hitDamage;
    appState.s4.isCombo = comboActive;

    telemetryLog.innerText = comboActive 
        ? `[MVC] ¡Golpe de combo! Daño de ataque duplicado (+40) y acumulado en memoria.` 
        : `[MVC] Golpe registrado en el Modelo (+20). Total en memoria: ${appState.s4.damage}`;

    renderizar();
});

btnS4ClearMvc.addEventListener("click", () => {
    appState.s4.damage = 0;
    appState.s4.lastHitTime = 0;
    appState.s4.isCombo = false;
    telemetryLog.innerText = "[MVC] Muñeco de pruebas restablecido en el Modelo. Daño en memoria puesto a 0.";
    renderizar();
});

btnResetAll.addEventListener("click", resetearEstructura);
resetearEstructura();