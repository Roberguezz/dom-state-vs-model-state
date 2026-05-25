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

// Escenario 5: Hits rápidos
const sliderS5Mvc = document.getElementById("sliderS5Mvc");
const labelS5Mvc = document.getElementById("labelS5Mvc");
const hitCountMvc = document.getElementById("hitCountMvc");
const totalHitsMvc = document.getElementById("totalHitsMvc");
const hitLogMvc = document.getElementById("hitLogMvc");
const btnS5Mvc = document.getElementById("btnS5Mvc");
const btnS5ClearMvc = document.getElementById("btnS5ClearMvc");

// Escenario 6: Selector de colores y gradientes
const colorPickerMvc = document.getElementById("colorPickerMvc");
const gradientBoxMvc = document.getElementById("gradientBoxMvc");
const colorHistoryMvc = document.getElementById("colorHistoryMvc");
const colorCountMvc = document.getElementById("colorCountMvc");
const btnS6ResetMvc = document.getElementById("btnS6ResetMvc");

// Escenario 7: Lista editable
const inputListMvc = document.getElementById("inputListMvc");
const btnAddListMvc = document.getElementById("btnAddListMvc");
const listContainerMvc = document.getElementById("listContainerMvc");
const btnS7ClearMvc = document.getElementById("btnS7ClearMvc");
const countMvc = document.getElementById("countMvc");
const verifyCountMvc = document.getElementById("verifyCountMvc");
const verifyStatusMvc = document.getElementById("verifyStatusMvc");

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
    s5: { hitCount: 0, totalDamage: 0, hits: [] },
    s6: { color: "#6bcf7f", colorHistory: [] },
    s7: { items: [] },
    tasas: { EUR: 1.0, USD: 1.10, JPY: 160.0 }
};

function resetearEstructura() {
    appState.s1 = { progreso: 0, nivel: 1 };
    appState.s2 = { saldoEuros: 0.0, divisa: "EUR" };
    appState.s3 = { pasoActual: 1, formulario: { nombre: "", telefono: "" } };
    appState.s4 = { damage: 0, lastHitTime: 0, isCombo: false };
    appState.s5 = { hitCount: 0, totalDamage: 0, hits: [] };
    appState.s6 = { color: "#6bcf7f", colorHistory: [] };
    appState.s7 = { items: [] };
    selectS2Mvc.value = "EUR";
    wrapperMvc.style.width = "100px";
    previewMvc.innerText = "null";
    colorPickerMvc.value = "#6bcf7f";
    inputListMvc.value = "";
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

    // Escenario 6: Gradiente de color
    const gradient = `linear-gradient(135deg, ${appState.s6.color}, #4ec9b0)`;
    gradientBoxMvc.style.background = gradient;
    colorHistoryMvc.innerText = appState.s6.colorHistory.length === 0 ? "—" : appState.s6.colorHistory.join(", ");
    colorCountMvc.innerText = appState.s6.colorHistory.length;

    // Escenario 5: Hits rápidos
    hitCountMvc.innerText = appState.s5.hitCount;
    totalHitsMvc.innerText = appState.s5.totalDamage;
    hitLogMvc.innerText = appState.s5.hits.length === 0 ? "—" : appState.s5.hits.join(" + ");

    // Escenario 7: Lista editable
    renderizarListaMvc();
}

function renderizarListaMvc() {
    listContainerMvc.innerHTML = appState.s7.items
        .map((item, index) => `<li style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border-color); font-size: 0.9rem;"><span>${item.text}</span><button data-index="${index}" class="btn-delete-item" style="background: none; border: none; color: var(--flat-green); cursor: pointer; font-weight: bold; padding: 0 4px;">×</button></li>`)
        .join("");
    countMvc.innerText = appState.s7.items.length;
    verifyCountMvc.innerText = appState.s7.items.length;
    verifyStatusMvc.innerText = " — sincronizado";
    verifyStatusMvc.style.color = "var(--text-muted)";

    // Añadir listeners a los botones de eliminar
    listContainerMvc.querySelectorAll(".btn-delete-item").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = parseInt(e.target.getAttribute("data-index"));
            
            // Borrado del Modelo es inmediato y seguro
            appState.s7.items.splice(index, 1);
            
            const li = e.target.parentElement;
            li.style.opacity = "0.4"; // Simula animación
            
            // Renderizado asíncrono no causa desincronización
            setTimeout(() => {
                renderizarListaMvc();
                telemetryLog.innerText = `[MVC] Elemento eliminado de la lista. Total en Modelo: ${appState.s7.items.length}`;
            }, 400);
        });
    });
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

// Controladores del Escenario 5 (Hits rápidos)
sliderS5Mvc.addEventListener("input", (e) => {
    const mult = parseInt(e.target.value);
    labelS5Mvc.innerText = `x${mult}`;
});

btnS5Mvc.addEventListener("click", () => {
    const mult = parseInt(sliderS5Mvc.value);
    const damage = 10 * mult;
    
    appState.s5.hitCount++;
    appState.s5.totalDamage += damage;
    appState.s5.hits.push(damage);
    
    telemetryLog.innerText = `[MVC] Golpe registrado (+${damage}). Total: ${appState.s5.totalDamage}. Golpes: ${appState.s5.hitCount}`;
    
    // El renderizado asíncrono no corrompe los datos porque el Modelo ya se actualizó
    setTimeout(() => {
        renderizar();
    }, 300);
});

btnS5ClearMvc.addEventListener("click", () => {
    appState.s5.hitCount = 0;
    appState.s5.totalDamage = 0;
    appState.s5.hits = [];
    telemetryLog.innerText = "[MVC] Contador de golpes restablecido en el Modelo.";
    renderizar();
});

// Controladores del Escenario 6 (Selector de colores)
colorPickerMvc.addEventListener("change", (e) => {
    appState.s6.color = e.target.value;
    appState.s6.colorHistory.push(e.target.value);
    telemetryLog.innerText = `[MVC] Color sincronizado en el Modelo: ${appState.s6.color}. Historial: ${appState.s6.colorHistory.length} cambios`;
    renderizar();
});

btnS6ResetMvc.addEventListener("click", () => {
    appState.s6.color = "#6bcf7f";
    appState.s6.colorHistory = [];
    colorPickerMvc.value = "#6bcf7f";
    telemetryLog.innerText = "[MVC] Historial y color restablecidos en el Modelo.";
    renderizar();
});

// Controladores del Escenario 7 (Lista editable)
btnAddListMvc.addEventListener("click", () => {
    const texto = inputListMvc.value.trim();
    if (!texto) {
        telemetryLog.innerText = "[MVC] Campo vacío. No se añadió elemento.";
        return;
    }
    appState.s7.items.push({ id: Date.now(), text: texto });
    inputListMvc.value = "";
    telemetryLog.innerText = `[MVC] Elemento añadido a la lista en el Modelo. Total: ${appState.s7.items.length}`;
    renderizar();
});

btnS7ClearMvc.addEventListener("click", () => {
    appState.s7.items = [];
    telemetryLog.innerText = "[MVC] Lista vaciada en el Modelo.";
    renderizar();
});

btnResetAll.addEventListener("click", resetearEstructura);
resetearEstructura();