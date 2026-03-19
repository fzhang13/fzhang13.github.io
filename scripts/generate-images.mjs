import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Brand colors matching tailwind config
const COLORS = {
  dark950: '#0d0e10',
  dark800: '#2a2d32',
  dark300: '#9fa2a8',
  primary400: '#59b0ff',
  primary600: '#1b6ff5',
  white: '#ffffff',
};

/* ------------------------------------------------------------------ */
/*  OG Image – 1200x630                                                */
/* ------------------------------------------------------------------ */
async function generateOGImage() {
  const w = 1200;
  const h = 630;

  const svg = `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${COLORS.dark950}"/>
      <stop offset="100%" stop-color="#0a0b0d"/>
    </linearGradient>
    <linearGradient id="nameGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${COLORS.primary400}"/>
      <stop offset="100%" stop-color="${COLORS.primary600}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="${COLORS.primary600}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${COLORS.primary600}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="${COLORS.primary400}" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${w}" height="${h}" fill="url(#bg)"/>

  <!-- Grid -->
  <rect width="${w}" height="${h}" fill="url(#grid)"/>

  <!-- Glow -->
  <rect width="${w}" height="${h}" fill="url(#glow)"/>

  <!-- Terminal prompt -->
  <text x="600" y="200" text-anchor="middle"
        font-family="monospace" font-size="20" fill="${COLORS.primary400}" letter-spacing="3">
    $ whoami
  </text>

  <!-- Name -->
  <text x="600" y="310" text-anchor="middle"
        font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="96" fill="${COLORS.white}">
    Felix <tspan fill="url(#nameGrad)">Zhang</tspan>
  </text>

  <!-- Subtitle -->
  <text x="600" y="370" text-anchor="middle"
        font-family="system-ui, -apple-system, sans-serif" font-weight="300" font-size="26" fill="${COLORS.dark300}">
    Full-Stack Engineer
  </text>

  <!-- Subtitle parts -->
  <text x="600" y="415" text-anchor="middle"
        font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="${COLORS.primary400}" opacity="0.7">
    Cloud &amp; Backend  ·  AWS  ·  Scalable Systems
  </text>

  <!-- Bottom URL -->
  <text x="600" y="580" text-anchor="middle"
        font-family="monospace" font-size="16" fill="${COLORS.dark300}" opacity="0.5">
    fzhang13.github.io
  </text>

  <!-- Subtle border -->
  <rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="0" fill="none"
        stroke="${COLORS.dark800}" stroke-width="1" stroke-opacity="0.5"/>
</svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(publicDir, 'images', 'og-image.png'));

  console.log('✓ OG image: public/images/og-image.png (1200x630)');
}

/* ------------------------------------------------------------------ */
/*  Favicon – "FZ" monogram on dark bg with primary accent             */
/* ------------------------------------------------------------------ */
async function generateFavicons() {
  const faviconDir = join(publicDir, 'fonts', 'favicon');
  mkdirSync(faviconDir, { recursive: true });

  function faviconSVG(size) {
    const fontSize = Math.round(size * 0.42);
    const yOffset = Math.round(size * 0.58);
    const borderRadius = Math.round(size * 0.18);
    const borderWidth = Math.max(1, Math.round(size * 0.04));

    return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${COLORS.primary400}"/>
      <stop offset="100%" stop-color="${COLORS.primary600}"/>
    </linearGradient>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#111215"/>
      <stop offset="100%" stop-color="${COLORS.dark950}"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${borderRadius}" fill="url(#bgGrad)"/>

  <!-- Border -->
  <rect x="${borderWidth / 2}" y="${borderWidth / 2}"
        width="${size - borderWidth}" height="${size - borderWidth}"
        rx="${borderRadius}" fill="none"
        stroke="${COLORS.primary400}" stroke-width="${borderWidth}" stroke-opacity="0.3"/>

  <!-- FZ text -->
  <text x="${size / 2}" y="${yOffset}" text-anchor="middle"
        font-family="system-ui, -apple-system, sans-serif" font-weight="800"
        font-size="${fontSize}" fill="url(#fg)" letter-spacing="-1">
    FZ
  </text>
</svg>`;
  }

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    await sharp(Buffer.from(faviconSVG(size)))
      .png()
      .toFile(join(faviconDir, name));
    console.log(`✓ Favicon: public/fonts/favicon/${name} (${size}x${size})`);
  }

  // Generate ICO (16x16 + 32x32 combined) — just use the 32x32 as ico
  await sharp(Buffer.from(faviconSVG(32)))
    .png()
    .toFile(join(faviconDir, 'favicon.ico'));
  console.log('✓ Favicon: public/fonts/favicon/favicon.ico');

  // Also save the SVG version for modern browsers
  const svgContent = faviconSVG(512);
  const { writeFileSync } = await import('fs');
  writeFileSync(join(faviconDir, 'favicon.svg'), svgContent);
  console.log('✓ Favicon: public/fonts/favicon/favicon.svg');
}

/* ------------------------------------------------------------------ */
/*  Run                                                                */
/* ------------------------------------------------------------------ */
async function main() {
  console.log('Generating images...\n');
  await generateOGImage();
  console.log('');
  await generateFavicons();
  console.log('\nDone!');
}

main().catch(console.error);
