import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { install, parseArgs } from './install.mjs';
import { documentationPlan, kitRoot, listFiles, validateKit } from './validate.mjs';

function fixture(t) {
  const directory = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'claude-skill-kit-test-')));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}

function projectOptions(project, extras = {}) {
  return { project, global: false, rules: [], starter: false, docs: false, dryRun: false, ...extras };
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
  assert.throws(() => install(projectOptions(project, { starter: true, docs: true })));
  assert(!fs.existsSync(path.join(project, '.claude')));
  assert(!fs.existsSync(path.join(project, 'docs')));
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
  assert.throws(() => parseArgs(['--global', '--docs']));
  assert.throws(() => parseArgs(['--global', project]));
  assert.throws(() => parseArgs([project, '--force']));
});

test('complete starter preview, installation and repeat install preserve source content', t => {
  const project = fixture(t);
  const options = parseArgs([project, '--docs', '--starter', '--rules=react-admin']);
  assert(install({ ...options, dryRun: true }).pending > 30);
  assert.deepEqual(fs.readdirSync(project), []);
  const result = install(options);
  const { manifest } = validateKit();
  for (const { source, target } of documentationPlan(kitRoot, manifest)) {
    assert(fs.readFileSync(path.join(kitRoot, source)).equals(fs.readFileSync(path.join(project, target))), target);
  }
  assert(fs.existsSync(path.join(project, 'docs', 'DESIGN_SPEC.md')));
  assert(!fs.existsSync(path.join(project, 'AGENTS.md')));
  assert(!fs.existsSync(path.join(project, '.github')));
  const again = install(options);
  assert.equal(again.copied, 0);
  assert.equal(again.identical, result.copied);
});

test('docs are opt-in and independent of root instructions', t => {
  const project = fixture(t);
  fs.writeFileSync(path.join(project, 'CLAUDE.md'), 'Existing rules');
  install(projectOptions(project));
  assert(!fs.existsSync(path.join(project, 'docs')));
  install(projectOptions(project, { docs: true }));
  assert.equal(fs.readFileSync(path.join(project, 'CLAUDE.md'), 'utf8'), 'Existing rules');
  assert(fs.existsSync(path.join(project, 'docs', 'REQUIREMENTS.md')));
});

test('existing design spec prevents every selected copy and preserves unrelated docs', t => {
  const project = fixture(t);
  fs.mkdirSync(path.join(project, 'docs'));
  fs.writeFileSync(path.join(project, 'docs', 'DESIGN_SPEC.md'), 'Approved product design');
  fs.writeFileSync(path.join(project, 'docs', 'custom.md'), 'Keep this');
  assert.throws(() => install(projectOptions(project, { docs: true, starter: true })), /Nothing copied/);
  assert(!fs.existsSync(path.join(project, '.claude')));
  assert(!fs.existsSync(path.join(project, 'CLAUDE.md')));
  assert.deepEqual(fs.readdirSync(path.join(project, 'docs')).sort(), ['DESIGN_SPEC.md', 'custom.md']);
  assert.equal(fs.readFileSync(path.join(project, 'docs', 'DESIGN_SPEC.md'), 'utf8'), 'Approved product design');
});

test('unrelated document survives a complete docs install', t => {
  const project = fixture(t);
  fs.mkdirSync(path.join(project, 'docs'));
  fs.writeFileSync(path.join(project, 'docs', 'custom.md'), 'Project-owned');
  install(projectOptions(project, { docs: true }));
  assert.equal(fs.readFileSync(path.join(project, 'docs', 'custom.md'), 'utf8'), 'Project-owned');
});

test('symlink document destinations cannot escape the project', t => {
  for (const location of ['docs', 'docs/engineering', 'docs/DESIGN_SPEC.md']) {
    const project = fixture(t);
    const external = fixture(t);
    fs.mkdirSync(path.dirname(path.join(project, location)), { recursive: true });
    fs.symlinkSync(external, path.join(project, location), 'dir');
    assert.throws(() => install(projectOptions(project, { docs: true })), /symlink/);
    assert.deepEqual(fs.readdirSync(external), []);
    assert(!fs.existsSync(path.join(project, '.claude')));
  }
});

test('relocated kit installs a complete starter with working document references', t => {
  const moved = path.join(fixture(t), 'kit');
  fs.cpSync(kitRoot, moved, { recursive: true, filter: source => path.basename(source) !== '.git' });
  const project = fixture(t);
  const run = spawnSync(process.execPath, [path.join(moved, 'install.mjs'), project, '--docs', '--starter'], { encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  assert(fs.existsSync(path.join(project, 'docs', 'engineering', 'migration.md')));
  assert(fs.existsSync(path.join(project, 'docs', 'features', '_TEMPLATE.md')));
});

test('missing installed references and unsafe document mappings fail validation', t => {
  const moved = path.join(fixture(t), 'kit');
  fs.cpSync(kitRoot, moved, { recursive: true, filter: source => path.basename(source) !== '.git' });
  const source = path.join(moved, 'templates', 'project', 'DESIGN_SPEC.md');
  const original = fs.readFileSync(source);
  fs.appendFileSync(source, '\n[Missing](engineering/not-shipped.md)\n');
  assert.throws(() => validateKit(moved), /Missing installed document reference/);
  fs.writeFileSync(source, original);
  const manifestPath = path.join(moved, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath));
  manifest.projectDocuments['../escape.md'] = 'templates/project/README.md';
  fs.writeFileSync(manifestPath, JSON.stringify(manifest));
  assert.throws(() => validateKit(moved), /Invalid document target/);
});

test('document source symlink directories are rejected before installation', t => {
  const moved = path.join(fixture(t), 'kit');
  fs.cpSync(kitRoot, moved, { recursive: true, filter: source => path.basename(source) !== '.git' });
  const source = path.join(moved, 'templates', 'project');
  fs.renameSync(source, `${source}-original`);
  fs.symlinkSync(`${source}-original`, source, 'dir');
  const project = fixture(t);
  assert.throws(() => install(projectOptions(project, { docs: true }), moved), /Symlink document source/);
  assert.deepEqual(fs.readdirSync(project), []);
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
