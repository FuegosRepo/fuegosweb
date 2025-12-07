const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'node_modules', 'next', 'dist', 'build', 'generate-build-id.js');

let content = fs.readFileSync(filePath, 'utf8');

// Patch the generateBuildId function to handle when generate is not a function
const patched = content.replace(
  'async function generateBuildId(generate, fallback) {\n    let buildId = await generate();',
  `async function generateBuildId(generate, fallback) {
    let buildId = null;
    if (typeof generate === 'function') {
        buildId = await generate();
    }`
);

if (patched !== content) {
    fs.writeFileSync(filePath, patched, 'utf8');
    console.log('✅ Patched Next.js build file successfully');
} else {
    console.log('⚠️  File already patched or patch not needed');
}

