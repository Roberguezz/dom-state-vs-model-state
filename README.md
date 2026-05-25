# Separación de Vista y Modelo (MVC) - Demo interactiva

Proyecto de aprendizaje y demostración práctica que compara un enfoque acoplado al DOM con la arquitectura basada en Modelo en memoria.

## ¿Qué incluye?

- Comparativas entre código que lee el estado directo del DOM y código que mantiene el estado en un modelo separado.
- Ejemplos altamente visuales: barras de progreso, conversión de divisas, formularios dinámicos y un mini combate RPG interactivo.
- Controles interactivos: sliders, botones, selectores y formularios con comportamiento real.
- Explicaciones claras de por qué el acoplamiento al DOM rompe mantenibilidad, rendimiento y robustez.

## Por qué es útil

Este proyecto enseña los riesgos de usar el DOM como fuente de verdad:

- Estado frágil cuando cambia la presentación visual.
- Errores por parseo de texto o formatos con símbolos de divisa.
- Dificultad para mantener y depurar aplicaciones al mezclar lógica visual y de negocio.

En contraste, el modelo en memoria permite:

- Cálculos independientes del tamaño o estilo del contenedor.
- Formateo visual separado de la lógica de datos.
- Actualizaciones predecibles y más fáciles de probar.

## Ejemplos destacados

1. **Escalado de contenedores**
   - Usa un slider para cambiar el ancho simulado.
   - Compara una barra de progreso acoplada a píxeles con otra basada en progreso porcentual en memoria.

2. **Conversión de divisas**
   - Cambia entre EUR, USD y JPY.
   - Observa cómo el modelo conserva los datos numéricos puros y la vista solo los formatea.

3. **Formulario paso a paso**
   - Inputs dinámicos dentro de un flujo de pasos.
   - Sin dependencias directas del DOM para almacenar los valores.

4. **Mini combate RPG**
   - Botones clicables, daño acumulado y combos.
   - Lógica de juego gestionada en el estado en memoria, no en la representación visual.

## Estructura del proyecto

- `index.html` — Interfaz de demostración y estructura de los ejemplos.
- `styles.css` — Estilos visuales y diseño de la página.
- `mvc.js` — Implementación del modelo en memoria y renderizado reactivo.
- `no-mvc.js` — Código comparativo que muestra los errores típicos de acoplarse al DOM.

## Cómo ejecutar

1. Instala dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abre el navegador en la URL que indique Vite.

## Nota de contraste visual

El proyecto es funcional y estilísticamente limpio. Sin embargo, se recomienda revisar los bloques de código comparativo para asegurar un contraste suficiente entre fondo y texto, especialmente en temas oscuros.

## Objetivo

Crear una guía visual y práctica para comprender por qué separar la vista del modelo es un paso clave en el desarrollo frontend moderno.
