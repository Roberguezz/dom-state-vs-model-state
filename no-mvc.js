
    const telemetryLog = document.getElementById("telemetryMsg");
    const btnResetAll = document.getElementById("btnResetAll");

    // Escenario 1: Acoplamiento de Escala y HUD
    const btnS1Coupled = document.getElementById("btnS1Coupled");
    const barCoupled = document.getElementById("barCoupled");
    const lvlCoupled = document.getElementById("lvlCoupled");
    const sliderScale = document.getElementById("sliderScale");
    const labelScale = document.getElementById("labelScale");
    const wrapperCoupled = document.getElementById("wrapperCoupled");

    // Escenario 2: Acoplamiento Financiero y Parseo de Texto
    const btnS2Coupled = document.getElementById("btnS2Coupled");
    const selectS2Coupled = document.getElementById("selectS2Coupled");
    const totalCoupled = document.getElementById("totalCoupled");

    // Escenario 3: Destrucción de Nodos del DOM y Pérdida de Datos
    const formContainerCoupled = document.getElementById("formContainerCoupled");
    const btnPrevCoupled = document.getElementById("btnPrevCoupled");
    const btnNextCoupled = document.getElementById("btnNextCoupled");
    const btnS3Coupled = document.getElementById("btnS3Coupled");
    const previewCoupled = document.getElementById("previewCoupled");

    // Escenario 4: Sincronización Acoplada Multivista
    const btnS4AddCoupled = document.getElementById("btnS4AddCoupled");
    const btnS4ClearCoupled = document.getElementById("btnS4ClearCoupled");
    const cartBadgeCoupled = document.getElementById("cartBadgeCoupled");
    const cartListCoupled = document.getElementById("cartListCoupled");
    const cartTotalCoupled = document.getElementById("cartTotalCoupled");

    const HTML_STEP_1 = `<label class="form-label">Nombre Completo del Usuario:</label>
                         <input type="text" id="inputNombreCoupled" class="input" placeholder="Ej. Carlos Mendoza">`;
    const HTML_STEP_2 = `<label class="form-label">Número Telefónico Corporativo:</label>
                         <input type="text" id="inputTelCoupled" class="input" placeholder="Ej. 600112233">`;

    let coupledStep = 1;
    let tempTelefono = ""; 
    let coupledCartItems = [];

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
        coupledCartItems = [];
        cartBadgeCoupled.innerText = "0";
        cartListCoupled.innerHTML = `<li class="cart-empty">Carrito vacío</li>`;
        cartTotalCoupled.innerText = "$ 0.00";
        irAPaso1();
    }

    // Escenario 1: Incremento acoplado al ancho físico (px) de la barra
    btnS1Coupled.addEventListener("click", () => {
        let px = parseInt(barCoupled.style.width) || 0;
        let nuevo = px + 20;

        if (nuevo >= 100) {
            lvlCoupled.innerText = parseInt(lvlCoupled.innerText) + 1;
            nuevo = 0;
            telemetryLog.innerText = "[DOM ACOPLADO] Nivel incrementado limpiando barra a 0px física.";
        } else {
            telemetryLog.innerText = `[DOM ACOPLADO] Ancho de barra incrementado a: ${nuevo}px`;
        }
        barCoupled.style.width = nuevo + "px";
    });

    // Escenario 2: Lectura de estado desde strings formateados en pantalla (Data Scraping)
    selectS2Coupled.addEventListener("change", (e) => {
        const divisa = e.target.value;
        let texto = totalCoupled.innerText;
        
        // El replace de "€" falla si el texto contiene "$" o "¥", resultando en un valor numérico inválido (NaN)
        let limpio = parseFloat(texto.replace(" €", ""));

        if (isNaN(limpio)) {
            totalCoupled.innerText = "NaN";
            telemetryLog.innerText = "[DOM ACOPLADO] ERROR: No se pudo limpiar la divisa. Caracteres residuales causaron NaN.";
            return;
        }

        if (divisa === "USD") totalCoupled.innerText = "$ " + (limpio * 1.10).toFixed(2);
        else if (divisa === "JPY") totalCoupled.innerText = "¥ " + Math.floor(limpio * 160);
        else if (divisa === "EUR") totalCoupled.innerText = limpio.toFixed(2) + " €";
        
        telemetryLog.innerText = `[DOM ACOPLADO] Divisa cambiada en pantalla a: ${divisa}`;
    });

    btnS2Coupled.addEventListener("click", () => {
        let texto = totalCoupled.innerText;
        // Intenta limpiar múltiples signos a mano en la vista
        let limpio = parseFloat(texto.replace(" €", "").replace("$ ", "").replace("¥ ", ""));

        if (isNaN(limpio)) {
            telemetryLog.innerText = "[DOM ACOPLADO] ERROR: Operación abortada. El total en pantalla contiene NaN.";
            return;
        }

        let total = limpio + 10.00;
        let div = selectS2Coupled.value;
        
        if (div === "EUR") totalCoupled.innerText = total.toFixed(2) + " €";
        else if (div === "USD") totalCoupled.innerText = "$ " + total.toFixed(2);
        else if (div === "JPY") totalCoupled.innerText = "¥ " + Math.floor(total);
        
        telemetryLog.innerText = `[DOM ACOPLADO] Saldo en pantalla incrementado (+10.00 en divisa activa).`;
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
        telemetryLog.innerText = "[DOM ACOPLADO] Paso 1 destruido mediante innerHTML. Datos no guardados en variables se pierden.";
    });

    btnPrevCoupled.addEventListener("click", () => {
        // Guarda el teléfono temporalmente en memoria, pero el nombre se pierde al haber sido destruido del DOM
        tempTelefono = document.getElementById("inputTelCoupled").value;
        irAPaso1();
        telemetryLog.innerText = "[DOM ACOPLADO] Retornado a Paso 1. El campo de texto de Nombre está vacío.";
    });

    btnS3Coupled.addEventListener("click", () => {
        let nombreDetectado = document.getElementById("inputNombreCoupled") ? document.getElementById("inputNombreCoupled").value : "";
        let telDetectado = document.getElementById("inputTelCoupled") ? document.getElementById("inputTelCoupled").value : tempTelefono;

        let payload = { nombre: nombreDetectado, telefono: telDetectado };
        previewCoupled.innerText = JSON.stringify(payload);
        telemetryLog.innerText = "[DOM ACOPLADO] Payload guardado leyendo nodos activos en tiempo real.";
    });

    // Escenario 4: Sincronización manual multipunto en la vista
    btnS4AddCoupled.addEventListener("click", () => {
        const index = coupledCartItems.length + 1;
        const newItem = { id: index, name: `Servicio Pro #${index}`, price: 49.99 };
        coupledCartItems.push(newItem);

        // Modificación manual 1: Badge de cabecera
        cartBadgeCoupled.innerText = coupledCartItems.length;

        // Modificación manual 2: Inserción directa de nodo en la lista
        if (coupledCartItems.length === 1) {
            cartListCoupled.innerHTML = ""; // Limpiar placeholder de vacío
        }
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `<span>${newItem.name}</span><span class="cart-item-price">$ ${newItem.price.toFixed(2)}</span>`;
        cartListCoupled.appendChild(li);

        // Modificación manual 3: Cálculo del total y actualización de pantalla
        let total = 0;
        coupledCartItems.forEach(item => total += item.price);
        cartTotalCoupled.innerText = `$ ${total.toFixed(2)}`;

        telemetryLog.innerText = "[DOM ACOPLADO] Modificados individualmente Badge, Lista e Indicador de Total en el DOM.";
    });

    btnS4ClearCoupled.addEventListener("click", () => {
        coupledCartItems = [];
        // Reseteo manual de todas las vistas acopladas
        cartBadgeCoupled.innerText = "0";
        cartListCoupled.innerHTML = `<li class="cart-empty">Carrito vacío</li>`;
        cartTotalCoupled.innerText = "$ 0.00";
        telemetryLog.innerText = "[DOM ACOPLADO] Vistas reseteadas manualmente una a una tras borrar la colección.";
    });

    btnResetAll.addEventListener("click", reiniciarTodo);
    reiniciarTodo();