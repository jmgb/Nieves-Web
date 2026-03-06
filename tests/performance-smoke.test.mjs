import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const worker = readFileSync(new URL('../src/index.js', import.meta.url), 'utf8');

function getTagByAlt(alt) {
  const escapedAlt = alt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = html.match(new RegExp(`<img[^>]*alt="${escapedAlt}"[^>]*>`, 'i'));
  return match?.[0] ?? '';
}

test('HTML no longer disables browser caching via meta tags', () => {
  assert.ok(!html.includes('http-equiv="Cache-Control"'));
  assert.ok(!html.includes('http-equiv="Pragma"'));
  assert.ok(!html.includes('http-equiv="Expires"'));
});

test('above-the-fold hero portfolio image is prioritized', () => {
  const tag = getTagByAlt('ROMOLA Project');
  assert.match(tag, /fetchpriority="high"/i);
  assert.match(tag, /loading="eager"/i);
});

test('below-the-fold images are lazy loaded', () => {
  const tag = getTagByAlt('Burj Azizi Dubai Project');
  assert.match(tag, /loading="lazy"/i);
});

test('worker serves static assets with 1-day caching without immutable', () => {
  assert.match(worker, /const ASSET_CACHE_TTL = 86400;/);
  assert.ok(!worker.includes('immutable'));
});
