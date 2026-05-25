(function() {
    const log = document.getElementById("telemetryMsg");
    const btnReset = document.getElementById("btnResetAll");

    // ESCENARIO 1
    const btnS1Sin = document.getElementById("btnS1Sin");
    const barSin = document.getElementById("barSin");
    const lvlSin = document.getElementById("lvlSin");
    const sliderS1 = document.getElementById("sliderS1");
    const txtS1Res = document.getElementById("txtS1Res");
    const wrapperSin = document.getElementById("wrapperSin");

    // ESCENARIO 2
    const btnS2Sin = document.getElementById("btnS2Sin");
    const selectS2Sin = document.getElementById("selectS2Sin");
    const totalSin = document.getElementById("totalSin");

    // ESCENARIO 3
    const contenedorFormSin = document.getElementById("contenedorFormSin");
    const btnPrevSin = document.getElementById("btnPrevSin");
    const btnNextSin = document.getElementById("btnNextSin");
    const btnS3Sin = document.getElementById("btnS3Sin");
    const previewSin = document.getElementById("previewSin");

    const HTML_P1 = `<label class="form-label">Nombre Completo del Usuario:</label>
                     <input type="text" id="inputNombreSin" class="input" placeholder="Ej. Carlos Mendoza">`;
    const HTML_P2 = `<label class="form-label">Número Telefónico Corporativo:</label>
                     <input type="text" id="inputTelSin" class="input" placeholder="Ej. 600112233">`;

    let pasoActualSin = 1;
    let temporalTel = ""; 

    function reiniciarTodo() {
        barSin.style.width = "0px";
        lvlSin.innerText = "1";
        totalSin.innerText = "0.00€";
        selectS2Sin.value = "EUR";
        sliderS1.value = "100";
        txtS1Res.innerText = "100px";
        wrapperSin.style.width = "100px";
        previewSin.innerText = "null";
        pasoActualSin = 1;
        temporalTel = "";
        irAPaso1();
    }

    // ESCENARIO 1: FLOTACIÓN DE PÍXELES
    btnS1Sin.addEventListener("click", () => {
        let px = parseInt(barSin.style.width) || 0;
        let nuevo = px + 20;

        if (nuevo >= 100) {
            lvlSin.innerText = parseInt(lvlSin.innerText) + 1;
            nuevo = 0;
            log.innerText = "[DOM ACOPLADO]: Nivel incrementado limpiando barra a 0px.";
        } else {
            log.innerText = `[DOM ACOPLADO]: Progreso actual: ${nuevo}px de ancho físico.`;
        }
        barSin.style.width = nuevo + "px";
    });

    // ESCENARIO 2: ERROR CRÍTICO DE PARSEO
    selectS2Sin.addEventListener("change", (e) => {
        const divisa = e.target.value;
        let texto = totalSin.innerText;
        let limpio = parseFloat(texto.replace("€", ""));

        if (isNaN(limpio)) {
            totalSin.innerText = "NaN";
            log.innerText = "💥 [DOM ACOPLADO]: Error Fatal (NaN). El replace('€') no pudo limpiar el signo de dólar ($) u otro.";
            return;
        }

        if (divisa === "USD") totalSin.innerText = "$" + (limpio * 1.10).toFixed(2);
        if (divisa === "JPY") totalSin.innerText = "¥" + Math.floor(limpio * 160);
        if (divisa === "EUR") totalSin.innerText = limpio.toFixed(2) + "€";
    });

    btnS2Sin.addEventListener("click", () => {
        let texto = totalSin.innerText;
        let limpio = parseFloat(texto.replace("€", "").replace("$", "").replace("¥", ""));

        if (isNaN(limpio)) {
            log.innerText = "💥 [DOM ACOPLADO]: Operación abortada. La pantalla está corrupta con NaN.";
            return;
        }

        let total = limpio + 10.00;
        let div = selectS2Sin.value;
        totalSin.innerText = div === "EUR" ? total.toFixed(2) + "€" : (div === "USD" ? "$" + total.toFixed(2) : "¥" + Math.floor(total));
    });

    // ESCENARIO 3: DESTRUCCIÓN DE NODOS
    function irAPaso1() {
        pasoActualSin = 1;
        contenedorFormSin.innerHTML = HTML_P1;
        btnPrevSin.disabled = true;
        btnNextSin.disabled = false;
    }

    btnNextSin.addEventListener("click", () => {
        pasoActualSin = 2;
        contenedorFormSin.innerHTML = HTML_P2;
        document.getElementById("inputTelSin").value = temporalTel;
        btnPrevSin.disabled = false;
        btnNextSin.disabled = true;
        log.innerText = "⚠️ [DOM ACOPLADO]: Se destruyó el Paso 1. Los datos no persistidos se eliminaron del árbol visual.";
    });

    btnPrevSin.addEventListener("click", () => {
        temporalTel = document.getElementById("inputTelSin").value;
        irAPaso1();
        log.innerText = "💥 [DOM ACOPLADO]: Regresaste al Paso 1. El campo del nombre vuelve a estar vacío.";
    });

    btnS3Sin.addEventListener("click", () => {
        let nombreDetectado = document.getElementById("inputNombreSin") ? document.getElementById("inputNombreSin").value : "";
        let telDetectado = document.getElementById("inputTelSin") ? document.getElementById("inputTelSin").value : temporalTel;

        let payload = { nombre: nombreDetectado, telefono: telDetectado };
        previewSin.innerText = JSON.stringify(payload);
    });

    btnReset.addEventListener("click", reiniciarTodo);
    reiniciarTodo();
})();