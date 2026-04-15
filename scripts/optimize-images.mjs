import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const DIRS_TO_OPTIMIZE = [
  'public/realisation',
  'public/img-eventos',
  'public/img-qualite',
  'public/logo',
  'public/brands',
];

const MAX_WIDTH = 1200;
const WEBP_QUALITY = 78;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) return;

  const originalSize = fs.statSync(filePath).size;
  const buffer = fs.readFileSync(filePath);

  try {
    const metadata = await sharp(buffer).metadata();
    
    let pipeline = sharp(buffer);
    
    // Resize if wider than MAX_WIDTH, keeping aspect ratio
    if (metadata.width && metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
    }

    // Output as WebP with good quality
    const optimized = await pipeline
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toBuffer();

    // Only write if it's actually smaller
    if (optimized.length < originalSize) {
      // If original wasn't .webp, write as .webp and delete original
      const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      fs.writeFileSync(webpPath, optimized);
      if (webpPath !== filePath) {
        fs.unlinkSync(filePath);
      }

      const savings = ((1 - optimized.length / originalSize) * 100).toFixed(1);
      console.log(
        `✅ ${path.basename(filePath)}: ${formatSize(originalSize)} → ${formatSize(optimized.length)} (-${savings}%)`
      );
    } else {
      console.log(`⏭️  ${path.basename(filePath)}: already optimal (${formatSize(originalSize)})`);
    }
  } catch (err) {
    console.error(`❌ Error processing ${filePath}:`, err.message);
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}

async function main() {
  console.log(`\n🖼️  Image Optimizer — max ${MAX_WIDTH}px, WebP quality ${WEBP_QUALITY}\n`);

  for (const dir of DIRS_TO_OPTIMIZE) {
    const fullDir = path.resolve(dir);
    if (!fs.existsSync(fullDir)) {
      console.log(`⚠️  Directory not found: ${dir}`);
      continue;
    }

    console.log(`\n📁 ${dir}/`);
    const files = fs.readdirSync(fullDir);
    for (const file of files) {
      await optimizeImage(path.join(fullDir, file));
    }
  }

  console.log('\n✨ Done!\n');
}

main();
