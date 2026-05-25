const { execSync } = require('child_process');
const path = require('path');

const projectDir = 'd:\\Clase\\mvc_example.worktrees\\copilot-style-fix-code-visibility';

console.log('\n=== REALIZANDO COMMIT ===\n');

try {
  console.log('1. Estado actual:');
  console.log(execSync('git status', { cwd: projectDir, encoding: 'utf-8' }));
  
  console.log('\n2. Añadiendo cambios...');
  execSync('git add .', { cwd: projectDir, encoding: 'utf-8' });
  console.log('✓ Cambios añadidos\n');
  
  console.log('3. Realizando commit...');
  const commitMsg = `Fix code visibility and add interactive examples

- Improved code syntax highlighting colors for better readability
- Changed base code color from #d4d4d4 to #e8e8e8 for better contrast
- Enhanced Prism token colors with more vibrant, saturated palette
- Added Scenario 06: Color picker with live gradients (DOM vs Model state)
- Added Scenario 07: Editable list interface (Complex DOM manipulation fragility)
- Updated mvc.js with new state management and controllers
- Updated no-mvc.js with coupled DOM logic for new scenarios

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`;

  execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { cwd: projectDir, encoding: 'utf-8' });
  console.log('✓ Commit realizado\n');
  
  console.log('4. Estado final:');
  console.log(execSync('git status', { cwd: projectDir, encoding: 'utf-8' }));
  
  console.log('\n✅ COMMIT COMPLETADO EXITOSAMENTE\n');
} catch (error) {
  console.error('❌ ERROR durante commit:', error.message);
  process.exit(1);
}
