(function() {
    const log = document.getElementById("telemetryMsg");
    const btnReset = document.getElementById("btnResetAll");

    // ESCENARIO 1
    const btnS1Con = document.getElementById("btnS1Con");
    const barCon = document.getElementById("barCon");
    const lvlCon = document.getElementById("lvlCon");
    const wrapperCon = document.getElementById("wrapperCon");

    // ESCENARIO 2
    const btnS2Con = document.getElementById("btnS2Con");
    const selectS2Con = document.getElementById("selectS2Con");
    const totalCon = document.getElementById("totalCon");

    // ESCENARIO 3
    const contenedorFormCon = document.getElementById("contenedorFormCon");
    const btnPrevCon = document.getElementById("btnPrevCon");
    const btnNextCon = document.getElementById("btnNextCon");
    const btnS3Con = document.getElementById("btnS3Con");
    const previewCon = document.getElementById("previewCon");

    const HTML_P1 = `<label class="form-label">Nombre Completo del Usuario:</label>
                     <input type="text" id="inputNombreCon" name="nombre" class="input" placeholder="Ej. Carlos Mendoza">`;
    const HTML_P2 = `<label class="form-label">Número Telefónico Corporativo:</label>
                     <input type="text" id="inputTelCon" name="telefono" class="input" placeholder="Ej. 600112233">`;

    // MODELO: Estado Blindado en Memoria
    let AppState = {
        s1: { progreso: 0, nivel: 1 },
        s2: { dineroBaseEuros: 0.0, divisa: "EUR" },
        s3: { pasoActual: 1, formulario: { nombre: "", telefono: "" } },
        tasas: { EUR: 1.0, USD: 1.10, JPY: 160.0 }
    };

    function resetearEstructura() {
        AppState.s1 = { progreso: 0, nivel: 1 };
        AppState.s2 = { dineroBaseEuros: 0.0, divisa: "EUR" };
        AppState.s3 = { pasoActual: 1, formulario: { nombre: "", telefono: "" } };
        selectS2Con.value = "EUR";
        wrapperCon.style.width = "100px";
        previewCon.innerText = "null";
        renderizar();
    }

    // VISTA: Reflejo Puro de las Variables
    function renderizar() {
        lvlCon.innerText = AppState.s1.nivel;
        barCon.style.width = AppState.s1.progreso + "%";

        const div = AppState.s2.divisa;
        const totalNeto = AppState.s2.dineroBaseEuros * AppState.tasas[div];
        
        if (div === "EUR") totalCon.innerText = totalNeto.toFixed(2) + "€";
        if (div === "USD") totalCon.innerText = "$" + totalNeto.toFixed(2);
        if (div === "JPY") totalCon.innerText = "¥" + Math.floor(totalNeto);

        if (AppState.s3.pasoActual === 1) {
            contenedorFormCon.innerHTML = HTML_P1;
            document.getElementById("inputNombreCon").value = AppState.s3.formulario.nombre;
            btnPrevCon.disabled = true;
            btnNextCon.disabled = false;
        } else {
            contenedorFormCon.innerHTML = HTML_P2;
            document.getElementById("inputTelCon").value = AppState.s3.formulario.telefono;
            btnPrevCon.disabled = false;
            btnNextCon.disabled = true;
        }
    }

    // CONTROLADOR: Intercepciones Lógicas
    btnS1Con.addEventListener("click", () => {
        AppState.s1.progreso += 20;
        if (AppState.s1.progreso >= 100) {
            AppState.s1.nivel += 1;
            AppState.s1.progreso = 0;
            log.innerText = "[MVC DESACOPLADO]: Datos computados con éxito en memoria. Nivel incrementado.";
        } else {
            log.innerText = `[MVC DESACOPLADO]: Progreso registrado en variable interna: ${AppState.s1.progreso}/100`;
        }
        renderizar();
    });

    selectS2Con.addEventListener("change", (e) => {
        AppState.s2.divisa = e.target.value;
        log.innerText = "[MVC DESACOPLADO]: Divisa cambiada en el Modelo.";
        renderizar();
    });

    btnS2Con.addEventListener("click", () => {
        AppState.s2.dineroBaseEuros += 10.00;
        renderizar();
    });

    // Enlace de datos bidireccional mediante evento delegante
    contenedorFormCon.addEventListener("input", (e) => {
        const campo = e.target.name; 
        AppState.s3.formulario[campo] = e.target.value;
    });

    btnNextCon.addEventListener("click", () => {
        AppState.s3.pasoActual = 2;
        log.innerText = "[MVC DESACOPLADO]: Avanzando de pestaña. Los datos quedan blindados en el objeto JS.";
        renderizar();
    });

    btnPrevCon.addEventListener("click", () => {
        AppState.s3.pasoActual = 1;
        log.innerText = "[MVC DESACOPLADO]: Restaurando los valores almacenados en memoria.";
        renderizar();
    });

    btnS3Con.addEventListener("click", () => {
        previewCon.innerText = JSON.stringify(AppState.s3.formulario);
    });

    btnReset.addEventListener("click", resetearEstructura);
    resetearEstructura();
})();