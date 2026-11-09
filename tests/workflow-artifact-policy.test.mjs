import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const workflowDirectory = new URL('../.github/workflows/', import.meta.url);
const workflowPath = new URL('../.github/workflows/quality-artifact.yml', import.meta.url);
const legacyDeployPath = new URL('../.github/workflows/deploy.yml', import.meta.url);
const workflow = existsSync(workflowPath) ? readFileSync(workflowPath, 'utf8') : '';
const workflows = readdirSync(workflowDirectory)
  .filter((name) => name.endsWith('.yml') || name.endsWith('.yaml'))
  .map((name) => readFileSync(new URL(`../.github/workflows/${name}`, import.meta.url), 'utf8'))
  .join('\n');

test('GitHub Actions has no Cloudflare credentials or publish command', () => {
  assert.equal(existsSync(legacyDeployPath), false);
  assert.doesNotMatch(workflows, /CLOUDFLARE_API_TOKEN|secrets\.CLOUDFLARE/i);
  assert.doesNotMatch(workflows, /\bwrangler\s+(?:deploy|publish)\b|pages\s+deploy/i);
});

test('quality workflow creates a bounded artifact for separate root review', () => {
  assert.match(workflow, /pull_request:/);
  assert.match(workflow, /push:[\s\S]*?branches:\s*\n\s*- main/);
  assert.match(workflow, /node --test tests\/\*\.mjs/);
  assert.match(workflow, /npm run lint/);
  assert.match(workflow, /tar[\s\S]*?\.assetsignore[\s\S]*?index\.html[\s\S]*?assets[\s\S]*?src\/index\.js[\s\S]*?wrangler\.toml/);
  assert.match(workflow, /sha256sum/);
  assert.match(workflow, /actions\/upload-artifact@v4/);
  assert.match(workflow, /retention-days:\s*14/);
  assert.match(workflow, /contents:\s*read/);
  assert.doesNotMatch(workflow, /CLOUDFLARE_API_TOKEN|secrets\.|wrangler\s+(?:deploy|publish)/i);
});
