import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import test from 'node:test';
import { packageKit } from './package.mjs';
import { kitRoot } from './validate.mjs';

function fixture(t) {
  const directory = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'claude-kit-archive-test-')));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}

function repository(t) {
  const root = path.join(fixture(t), 'kit');
  fs.cpSync(kitRoot, root, { recursive: true, filter: source => path.basename(source) !== '.git' && !source.endsWith('.zip') && !source.endsWith('.sha256') });
  execFileSync('git', ['init', '-q', root]);
  execFileSync('git', ['-C', root, 'add', '.']);
  execFileSync('git', ['-C', root, '-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', '-c', 'commit.gpgsign=false', '-c', 'core.hooksPath=/dev/null', 'commit', '-qm', 'Synthetic package fixture']);
  return root;
}

test('archive includes one committed complete pack and installs independently', t => {
  const root = repository(t);
  const output = fixture(t);
  // Ignored local data must never enter the archive.
  fs.writeFileSync(path.join(root, '.env'), 'SYNTHETIC_SECRET=not-a-real-credential');
  const result = packageKit(output, root);
  const data = fs.readFileSync(result.archivePath);
  assert.equal(result.sha256, createHash('sha256').update(data).digest('hex'));
  assert.equal(fs.readFileSync(result.checksumPath, 'utf8'), `${result.sha256}  ${path.basename(result.archivePath)}\n`);
  assert(path.basename(result.archivePath).includes(result.commit.slice(0, 12)));
  const entries = execFileSync('unzip', ['-Z1', result.archivePath], { encoding: 'utf8' }).trim().split('\n');
  const prefix = entries[0];
  for (const name of ['LICENSE', 'manifest.json', 'playbook/migration.md', 'templates/project/DESIGN_SPEC.md', 'skills/code-quality/SKILL.md']) {
    assert(entries.includes(prefix + name), name);
  }
  assert(!entries.some(entry => entry.endsWith('/.env') || entry.includes('/.git/')));
  const unpacked = fixture(t);
  execFileSync('unzip', ['-q', result.archivePath, '-d', unpacked]);
  const project = fixture(t);
  execFileSync(process.execPath, [path.join(unpacked, prefix, 'validate.mjs')]);
  execFileSync(process.execPath, [path.join(unpacked, prefix, 'install.mjs'), project, '--docs', '--starter']);
  assert(fs.existsSync(path.join(project, 'docs', 'ARCHITECTURE.md')));
  assert(fs.existsSync(path.join(project, '.claude', 'skills', 'product-quality', 'SKILL.md')));
  assert.throws(() => packageKit(output, root), /Refusing to overwrite/);
  assert(fs.readFileSync(result.archivePath).equals(data));
});

test('dirty or untracked work blocks packaging rather than shipping a stale snapshot', t => {
  const root = repository(t);
  const output = fixture(t);
  const readme = path.join(root, 'README.md');
  const original = fs.readFileSync(readme);
  fs.appendFileSync(readme, '\nUncommitted change\n');
  assert.throws(() => packageKit(output, root), /must be clean/);
  fs.writeFileSync(readme, original);
  fs.writeFileSync(path.join(root, 'not-committed.md'), 'New documentation');
  assert.throws(() => packageKit(output, root), /must be clean/);
  assert.deepEqual(fs.readdirSync(output), []);
});
