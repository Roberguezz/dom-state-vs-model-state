
    const telemetryLog = document.getElementById("telemetryMsg");
    const btnResetAll = document.getElementById("btnResetAll");

    // Escenario 1: Control de Escala y HUD
    const btnS1Mvc = document.getElementById("btnS1Mvc");
    const barMvc = document.getElementById("barMvc");
    const lvlMvc = document.getElementById("lvlMvc");
    const wrapperMvc = document.getElementById("wrapperMvc");

    // Escenario 2: Conversión Dinámica de Divisas
    const btnS2Mvc = document.getElementById("btnS2Mvc");
    const selectS2Mvc = document.getElementById("selectS2Mvc");
    const totalMvc = document.getElementById("totalMvc");

    // Escenario 3: Persistencia de Formulario y Ciclo de Vida
    const formContainerMvc = document.getElementById("formContainerMvc");
    const btnPrevMvc = document.getElementById("btnPrevMvc");
    const btnNextMvc = document.getElementById("btnNextMvc");
    const btnS3Mvc = document.getElementById("btnS3Mvc");
    const previewMvc = document.getElementById("previewMvc");

    // Escenario 4: Sincronización Multivista (Carrito de compras)
    const btnS4AddMvc = document.getElementById("btnS4AddMvc");
    const btnS4ClearMvc = document.getElementById("btnS4ClearMvc");
    const cartBadgeMvc = document.getElementById("cartBadgeMvc");
    const cartListMvc = document.getElementById("cartListMvc");
    const cartTotalMvc = document.getElementById("cartTotalMvc");

    const HTML_STEP_1 = `<label class="form-label">Nombre Completo del Usuario:</label>
                         <input type="text" id="inputNombreMvc" name="nombre" class="input" placeholder="Ej. Carlos Mendoza">`;
    const HTML_STEP_2 = `<label class="form-label">Número Telefónico Corporativo:</label>
                         <input type="text" id="inputTelMvc" name="telefono" class="input" placeholder="Ej. 600112233">`;

    // MODELO: Estado centralizado en memoria
    const appState = {
        s1: { progreso: 0, nivel: 1 },
        s2: { saldoEuros: 0.0, divisa: "EUR" },
        s3: { pasoActual: 1, formulario: { nombre: "", telefono: "" } },
        s4: { items: [] },
        tasas: { EUR: 1.0, USD: 1.10, JPY: 160.0 }
    };

    function resetearEstructura() {
        appState.s1 = { progreso: 0, nivel: 1 };
        appState.s2 = { saldoEuros: 0.0, divisa: "EUR" };
        appState.s3 = { pasoActual: 1, formulario: { nombre: "", telefono: "" } };
        appState.s4 = { items: [] };
        selectS2Mvc.value = "EUR";
        wrapperMvc.style.width = "100px";
        previewMvc.innerText = "null";
        renderizar();
    }

    // VISTA: Renderizado declarativo a partir del estado de la aplicación
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
        cartBadgeMvc.innerText = appState.s4.items.length;
        if (appState.s4.items.length === 0) {
            cartListMvc.innerHTML = `<li class="cart-empty">Carrito vacío</li>`;
        } else {
            cartListMvc.innerHTML = appState.s4.items.map(item => `
                <li class="cart-item">
                    <span>${item.name}</span>
                    <span class="cart-item-price">$ ${item.price.toFixed(2)}</span>
                </li>
            `).join("");
        }
        const totalCarrito = appState.s4.items.reduce((sum, item) => sum + item.price, 0);
        cartTotalMvc.innerText = `$ ${totalCarrito.toFixed(2)}`;
    }

    // CONTROLADOR: Gestores de eventos y lógica de negocio
    btnS1Mvc.addEventListener("click", () => {
        appState.s1.progreso += 20;
        if (appState.s1.progreso >= 100) {
            appState.s1.nivel += 1;
            appState.s1.progreso = 0;
            telemetryLog.innerText = "[MVC DESACOPLADO] Nivel incrementado con éxito en memoria. Estado reiniciado.";
        } else {
            telemetryLog.innerText = `[MVC DESACOPLADO] Progreso actualizado en memoria: ${appState.s1.progreso}/100`;
        }
        renderizar();
    });

    selectS2Mvc.addEventListener("change", (e) => {
        appState.s2.divisa = e.target.value;
        telemetryLog.innerText = `[MVC DESACOPLADO] Cambio de divisa registrado en el Modelo a: ${appState.s2.divisa}`;
        renderizar();
    });

    btnS2Mvc.addEventListener("click", () => {
        appState.s2.saldoEuros += 10.00;
        telemetryLog.innerText = `[MVC DESACOPLADO] Saldo incrementado en memoria (+10.00 EUR). Nuevo total: ${appState.s2.saldoEuros.toFixed(2)} EUR`;
        renderizar();
    });

    // Delegación y sincronización bidireccional del formulario
    formContainerMvc.addEventListener("input", (e) => {
        const campo = e.target.name; 
        appState.s3.formulario[campo] = e.target.value;
    });

    btnNextMvc.addEventListener("click", () => {
        appState.s3.pasoActual = 2;
        telemetryLog.innerText = "[MVC DESACOPLADO] Avanzado a Paso 2. Los datos de la memoria persisten intactos.";
        renderizar();
    });

    btnPrevMvc.addEventListener("click", () => {
        appState.s3.pasoActual = 1;
        telemetryLog.innerText = "[MVC DESACOPLADO] Regresado a Paso 1. Restableciendo campos desde el Modelo.";
        renderizar();
    });

    btnS3Mvc.addEventListener("click", () => {
        previewMvc.innerText = JSON.stringify(appState.s3.formulario);
        telemetryLog.innerText = "[MVC DESACOPLADO] Payload de formulario exportado desde la memoria.";
    });

    // Controladores Escenario 4
    btnS4AddMvc.addEventListener("click", () => {
        const index = appState.s4.items.length + 1;
        appState.s4.items.push({
            id: index,
            name: `Servicio Pro #${index}`,
            price: 49.99
        });
        telemetryLog.innerText = `[MVC DESACOPLADO] Añadido ítem al Modelo. 3 vistas independientes sincronizadas automáticamente.`;
        renderizar();
    });

    btnS4ClearMvc.addEventListener("click", () => {
        appState.s4.items = [];
        telemetryLog.innerText = "[MVC DESACOPLADO] Carrito vaciado en el Modelo. Vistas notificadas y actualizadas.";
        renderizar();
    });

    btnResetAll.addEventListener("click", resetearEstructura);
    resetearEstructura();