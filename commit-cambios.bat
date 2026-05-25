@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo ========================================
echo COMMIT AUTOMÁTICO DE CAMBIOS GIT
echo ========================================
echo.

REM Mostrar estado actual
echo [PASO 1] Estado actual:
echo.
git status
echo.

REM Añadir todos los cambios
echo [PASO 2] Añadiendo cambios...
git add -A
if !errorlevel! neq 0 (
    echo ERROR: Falló al hacer add
    pause
    exit /b 1
)
echo ✓ Cambios añadidos
echo.

REM Hacer commit
echo [PASO 3] Haciendo commit...
git commit -m "Mejoras de estilo y nuevos ejemplos interactivos (S6: Color Picker, S7: Email Multipasos)

- Aumentado contraste de código: color base #d4d4d4 a #f0f0f0
- Mejorados tokens Prism para mayor legibilidad de código
- Escenario 06: Color Picker RGB con 3 sliders (R, G, B 0-255)
- Escenario 07: Email multipasos con destrucción de nodos (acoplado vs MVC)
- Todos los escenarios mantienen estructura dual consistente
- Telemetría actualizada para nuevos escenarios

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

if !errorlevel! neq 0 (
    echo ERROR: Falló al hacer commit
    pause
    exit /b 1
)
echo ✓ Commit realizado
echo.

REM Estado final
echo [PASO 4] Estado final:
echo.
git status
echo.

echo ========================================
echo ✅ ¡COMPLETADO EXITOSAMENTE!
echo ========================================
echo.
echo Los cambios han sido commiteados.
echo Ahora VS Code debería funcionar sin problemas.
echo.
pause
