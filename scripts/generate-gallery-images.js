/**
 * Builds src/data/galleryImages.json for SSR + client (no require.context).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUTPUT = path.join(ROOT, 'src', 'data', 'galleryImages.json');
const MANIFEST = path.join(ROOT, 'build', 'asset-manifest.json');
const ASSETS_DIR = path.join(ROOT, 'src', 'assets', 'Umrah photos');

function fromManifest() {
  if (!fs.existsSync(MANIFEST)) return null;
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const files = manifest.files || {};

  return Object.entries(files)
    .filter(([key]) => key.startsWith('static/media/') && /\.(jpe?g|png|webp)$/i.test(key))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map(([key, src]) => ({
      src,
      alt: `Umrah journey photo ${path.basename(key)}`,
    }));
}

function fromAssetsDir() {
  if (!fs.existsSync(ASSETS_DIR)) return null;

  return fs
    .readdirSync(ASSETS_DIR)
    .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((name) => ({
      src: `/static/media/${name}`,
      alt: `Umrah journey photo ${name}`,
    }));
}

function main() {
  const images = fromManifest() || fromAssetsDir() || [];

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, `${JSON.stringify(images, null, 2)}\n`, 'utf8');
  console.log(`Gallery manifest: ${images.length} image(s) → ${OUTPUT}`);
}

main();
