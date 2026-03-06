import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const worker = readFileSync(new URL('../src/index.js', import.meta.url), 'utf8');
const wrangler = readFileSync(new URL('../wrangler.toml', import.meta.url), 'utf8');

function srcForAlt(alt) {
  const escapedAlt = alt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = html.match(new RegExp(`<img[^>]*alt="${escapedAlt}"[^>]*src="([^"]+)"`, 'i'));
  return match?.[1] ?? '';
}

test('wrangler is configured to serve bundled static assets', () => {
  assert.match(wrangler, /assets\s*=\s*\{\s*directory\s*=\s*"\."\s*\}/i);
});

test('worker uses Cloudflare ASSETS binding instead of GitHub raw', () => {
  assert.doesNotMatch(worker, /raw\.githubusercontent\.com/i);
  assert.match(worker, /env\.ASSETS\.fetch/);
});

test('first ROMOLA images point to optimized webp assets', () => {
  assert.equal(srcForAlt('ROMOLA Project'), 'assets/images/projects/romola/romola_webp.webp');
  assert.equal(srcForAlt('ROMOLA Project 2'), 'assets/images/projects/romola/3-ROMOLA.webp');
  assert.equal(srcForAlt('ROMOLA Project 3'), 'assets/images/projects/romola/2-ROMOLA.webp');
});

test('optimized ROMOLA webp assets are smaller than original jpgs', () => {
  const optimizedA = statSync(new URL('../assets/images/projects/romola/3-ROMOLA.webp', import.meta.url)).size;
  const originalA = statSync(new URL('../assets/images/projects/romola/3-ROMOLA.jpg', import.meta.url)).size;
  const optimizedB = statSync(new URL('../assets/images/projects/romola/2-ROMOLA.webp', import.meta.url)).size;
  const originalB = statSync(new URL('../assets/images/projects/romola/2-ROMOLA.jpg', import.meta.url)).size;
  assert.ok(optimizedA < originalA, `${optimizedA} should be < ${originalA}`);
  assert.ok(optimizedB < originalB, `${optimizedB} should be < ${originalB}`);
});
