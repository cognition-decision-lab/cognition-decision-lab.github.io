import sharp from 'sharp';
import { readdir, stat, mkdir } from 'node:fs/promises';
import { dirname, extname, join, basename } from 'node:path';

const roots = ['public/faculty', 'public/researchers', 'public/students'];

async function ensureDir(dir) {
  try { await mkdir(dir, { recursive: true }); } catch {}
}

function outNames(inputPath) {
  const dir = dirname(inputPath);
  const name = basename(inputPath, extname(inputPath));
  return {
    avif: join(dir, `${name}-400.avif`),
    webp: join(dir, `${name}-400.webp`),
    jpg: join(dir, `${name}-400.jpg`),
  };
}

async function processFile(file) {
  const lower = file.toLowerCase();
  if (!/(\.jpg|\.jpeg|\.png)$/i.test(lower)) return;

  const outs = outNames(file);
  const img = sharp(file).resize(400, 400, { fit: 'cover', position: 'attention' });
  await img.clone().avif({ quality: 50 }).toFile(outs.avif);
  await img.clone().webp({ quality: 70 }).toFile(outs.webp);
  await img.clone().jpeg({ quality: 78 }).toFile(outs.jpg);
  console.log('Optimized:', file, '->', outs);
}

async function walk(dir) {
  const entries = await readdir(dir);
  for (const entry of entries) {
    const p = join(dir, entry);
    const s = await stat(p);
    if (s.isDirectory()) await walk(p); else await processFile(p);
  }
}

for (const root of roots) {
  await ensureDir(root);
  await walk(root);
}
console.log('Done.');
