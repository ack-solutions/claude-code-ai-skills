import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { install, parseArgs } from './install.mjs';
import { kitRoot, listFiles, validateKit } from './validate.mjs';

function fixture(t) {
  const directory = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'claude-skill-kit-test-')));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}

function projectOptions(project, extras = {}) {
  return { project, global: false, rules: [], starter: false, dryRun: false, ...extras };
}

test('all twelve skills validate with self-contained references', () => {
  const result = validateKit();
  assert.equal(result.manifest.skills.length, 12);
  assert(result.skillFiles > 12);
});

test('fresh installation preserves every source file and is idempotent', t => {
  const project = fixture(t);
  fs.writeFileSync(path.join(project, 'CLAUDE.md'), 'Existing project instructions\n');
  const first = install(projectOptions(project));
  assert(first.copied > 12);
  assert.equal(fs.readFileSync(path.join(project, 'CLAUDE.md'), 'utf8'), 'Existing project instructions\n');
  for (const relative of listFiles(path.join(kitRoot, 'skills'))) {
    assert(fs.readFileSync(path.join(kitRoot, 'skills', relative)).equals(fs.readFileSync(path.join(project, '.claude', 'skills', relative))));
  }
  const second = install(projectOptions(project));
  assert.equal(second.copied, 0);
  assert.equal(second.identical, first.copied);
});

test('different existing skill aborts before copying other skills', t => {
  const project = fixture(t);
  const target = path.join(project, '.claude', 'skills', 'code-quality');
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(path.join(target, 'SKILL.md'), 'Keep my custom skill');
  assert.throws(() => install(projectOptions(project)));
  assert.equal(fs.readFileSync(path.join(target, 'SKILL.md'), 'utf8'), 'Keep my custom skill');
  assert(!fs.existsSync(path.join(project, '.claude', 'skills', 'product-planning')));
});

test('extra files in a same-name skill cause a conflict; unrelated skills remain untouched', t => {
  const project = fixture(t);
  const directory = path.join(project, '.claude', 'skills');
  install(projectOptions(project));
  fs.mkdirSync(path.join(directory, 'custom-skill'));
  fs.writeFileSync(path.join(directory, 'custom-skill', 'SKILL.md'), 'Custom');
  assert.equal(install(projectOptions(project)).copied, 0);
  fs.writeFileSync(path.join(directory, 'code-quality', 'custom.md'), 'Custom extension');
  assert.throws(() => install(projectOptions(project)));
  assert.equal(fs.readFileSync(path.join(directory, 'code-quality', 'custom.md'), 'utf8'), 'Custom extension');
});

test('dry run creates nothing, optional rules and starter are explicit', t => {
  const project = fixture(t);
  const options = projectOptions(project, { rules: ['react-admin'], starter: true });
  assert(install({ ...options, dryRun: true }).pending > 12);
  assert.deepEqual(fs.readdirSync(project), []);
  install(options);
  assert(fs.existsSync(path.join(project, 'CLAUDE.md')));
  assert.deepEqual(fs.readdirSync(path.join(project, '.claude', 'rules')), ['react-admin.md']);
});

test('starter conflict prevents all copying', t => {
  const project = fixture(t);
  fs.writeFileSync(path.join(project, 'CLAUDE.md'), 'Keep my conventions');
  assert.throws(() => install(projectOptions(project, { starter: true })));
  assert(!fs.existsSync(path.join(project, '.claude')));
  assert.equal(fs.readFileSync(path.join(project, 'CLAUDE.md'), 'utf8'), 'Keep my conventions');
});

test('symlink config directory cannot redirect an installation', t => {
  const project = fixture(t);
  const external = fixture(t);
  fs.symlinkSync(external, path.join(project, '.claude'), 'dir');
  assert.throws(() => install(projectOptions(project)));
  assert.deepEqual(fs.readdirSync(external), []);
});

test('unknown rule and incompatible CLI options fail without writes', t => {
  const project = fixture(t);
  assert.throws(() => install(projectOptions(project, { rules: ['unknown'] })));
  assert.deepEqual(fs.readdirSync(project), []);
  assert.throws(() => parseArgs(['--global', '--starter']));
  assert.throws(() => parseArgs(['--global', project]));
  assert.throws(() => parseArgs([project, '--force']));
});

test('global mode respects an isolated custom config and installs skills only', t => {
  const directory = fixture(t);
  const config = path.join(directory, 'claude-config');
  const run = spawnSync(process.execPath, [path.join(kitRoot, 'install.mjs'), '--global'], {
    env: { ...process.env, CLAUDE_CONFIG_DIR: config }, encoding: 'utf8'
  });
  assert.equal(run.status, 0, run.stderr);
  assert.deepEqual(fs.readdirSync(config), ['skills']);
  assert.equal(fs.readdirSync(path.join(config, 'skills')).length, 12);
});

test('relocated standalone kit installs without the original project', t => {
  const directory = fixture(t);
  const moved = path.join(directory, 'copied-kit');
  fs.cpSync(kitRoot, moved, { recursive: true });
  const project = path.join(directory, 'new-project');
  fs.mkdirSync(project);
  const run = spawnSync(process.execPath, [path.join(moved, 'install.mjs'), project], { encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  assert.equal(fs.readdirSync(path.join(project, '.claude', 'skills')).length, 12);
});
