/**
 * Script para convertir imágenes JPG a WebP
 * 
 * Este script utiliza sharp para convertir todas las imágenes JPG en el directorio public
 * a formato WebP optimizado para mejor rendimiento web.
 * 
 * Uso:
 * npm install sharp --save-dev
 * node scripts/convert-images-to-webp.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directorios a procesar
const directories = [
  path.join(__dirname, '../public/realisation'),
  path.join(__dirname, '../public')
];

// Archivos JPG específicos que necesitan conversión
const specificFiles = [
  'realisation/3.jpg',
  'realisation/6.jpg',
  'realisation/8.jpg',
  'placeholder.jpg',
  'placeholder-user.jpg'
];

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ 
        quality: 85, // Calidad alta para imágenes principales
        effort: 6    // Máximo esfuerzo de compresión
      })
      .toFile(outputPath);
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(2);
    
    console.log(`✅ Convertido: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   Tamaño original: ${(inputStats.size / 1024).toFixed(2)} KB`);
    console.log(`   Tamaño WebP: ${(outputStats.size / 1024).toFixed(2)} KB`);
    console.log(`   Ahorro: ${savings}%\n`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error convirtiendo ${inputPath}:`, error.message);
    return false;
  }
}

async function processFiles() {
  console.log('🚀 Iniciando conversión de imágenes JPG a WebP...\n');
  
  let convertedCount = 0;
  let totalSavings = 0;
  
  for (const relPath of specificFiles) {
    const inputPath = path.join(__dirname, '../public', relPath);
    
    // Verificar si el archivo existe
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Archivo no encontrado: ${relPath}`);
      continue;
    }
    
    const outputPath = inputPath.replace(/\.jpg$/i, '.webp');
    
    // Verificar si ya existe la versión WebP
    if (fs.existsSync(outputPath)) {
      console.log(`ℹ️  Ya existe: ${path.basename(outputPath)} - omitiendo`);
      continue;
    }
    
    const success = await convertToWebP(inputPath, outputPath);
    if (success) {
      convertedCount++;
    }
  }
  
  console.log(`\n✨ Conversión completada!`);
  console.log(`📊 Total de imágenes convertidas: ${convertedCount}`);
  console.log(`\n⚠️  IMPORTANTE: No olvides actualizar las referencias en tu código de .jpg a .webp`);
  console.log(`\n💡 Para eliminar los archivos JPG originales después de verificar:`)
  console.log(`   node scripts/convert-images-to-webp.js --delete-originals`);
}

// Función para eliminar archivos originales (opcional)
async function deleteOriginalFiles() {
  console.log('🗑️  Eliminando archivos JPG originales...\n');
  
  for (const relPath of specificFiles) {
    const inputPath = path.join(__dirname, '../public', relPath);
    
    if (fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
      console.log(`✅ Eliminado: ${relPath}`);
    }
  }
  
  console.log('\n✨ Archivos originales eliminados!');
}

// Ejecutar script
const args = process.argv.slice(2);

if (args.includes('--delete-originals')) {
  deleteOriginalFiles();
} else {
  processFiles();
}

