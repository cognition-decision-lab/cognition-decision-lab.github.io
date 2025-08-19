import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');
const sourcePng = resolve(publicDir, 'favicon-crown.png');
const appleIcon = resolve(publicDir, 'apple-touch-icon.png');
const faviconIco = resolve(publicDir, 'favicon.ico');

async function run() {
  try {
    // Ensure source exists
    await fs.access(sourcePng);

    // Generate Apple Touch Icon (180x180)
    await sharp(sourcePng)
      .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(appleIcon);

    // Generate favicon.ico (multi-size)
    const buffers = await Promise.all([
      sharp(sourcePng).resize(16, 16).png().toBuffer(),
      sharp(sourcePng).resize(32, 32).png().toBuffer(),
      sharp(sourcePng).resize(48, 48).png().toBuffer()
    ]);
    const ico = await pngToIco(buffers);
    await fs.writeFile(faviconIco, ico);

    console.log('Generated:', appleIcon, faviconIco);
  } catch (err) {
    console.error('Icon generation failed:', err.message);
    process.exit(1);
  }
}

run();
