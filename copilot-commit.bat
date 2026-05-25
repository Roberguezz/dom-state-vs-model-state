@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

cd /d "d:\Clase\mvc_example.worktrees\copilot-style-fix-code-visibility"

echo Iniciando commit de cambios...
echo.

git status
echo.

echo Añadiendo cambios...
git add .
echo.

echo Realizando commit...
git commit -m "Fix code visibility and add interactive examples

- Improved code syntax highlighting colors for better readability
- Changed base code color from #d4d4d4 to #e8e8e8 for better contrast
- Enhanced Prism token colors with more vibrant, saturated palette
- Added Scenario 06: Color picker with live gradients
- Added Scenario 07: Editable list interface
- Updated mvc.js with new state management and controllers
- Updated no-mvc.js with coupled DOM logic for new scenarios

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

echo.
git status
echo.
echo Commit completado.
