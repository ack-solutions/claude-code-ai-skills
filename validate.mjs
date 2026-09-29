import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const kitRoot = path.dirname(fileURLToPath(import.meta.url));

export function listFiles(directory) {
  assert(fs.lstatSync(directory).isDirectory(), `Not a directory: ${directory}`);
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const absolute = path.join(directory, entry.name);
    assert(!entry.isSymbolicLink(), `Symlinks are not supported: ${absolute}`);
    if (entry.isDirectory()) {
      for (const nested of listFiles(absolute)) result.push(path.join(entry.name, nested));
    } else {
      assert(entry.isFile(), `Not a regular file: ${absolute}`);
      result.push(entry.name);
    }
  }
  return result;
}

function isSafeRelative(value) {
  return typeof value === 'string' && value.length > 0 && !value.includes('\\') &&
    !value.includes(':') && !path.posix.isAbsolute(value) &&
    value.split('/').every(part => part && part !== '.' && part !== '..');
}

export function documentationPlan(root, manifest) {
  assert(manifest.projectDocuments && typeof manifest.projectDocuments === 'object' && !Array.isArray(manifest.projectDocuments), 'Missing project document mapping');
  const plan = Object.entries(manifest.projectDocuments).map(([target, source]) => {
    assert(isSafeRelative(target) && target.startsWith('docs/') && !target.startsWith('docs/engineering/'), `Invalid document target: ${target}`);
    assert(isSafeRelative(source) && /^(templates\/project|playbook\/templates)\/.+\.md$/.test(source), `Invalid document source: ${source}`);
    let current = root;
    for (const segment of source.split('/')) {
      current = path.join(current, segment);
      assert(!fs.lstatSync(current).isSymbolicLink(), `Symlink document source: ${source}`);
    }
    assert(fs.lstatSync(path.join(root, source)).isFile(), `Missing or unsafe document source: ${source}`);
    return { source, target };
  });
  for (const relative of listFiles(path.join(root, 'playbook'))) {
    const name = relative.split(path.sep).join('/');
    plan.push({ source: `playbook/${name}`, target: `docs/engineering/${name}` });
  }
  plan.push({ source: 'manifest.json', target: 'docs/engineering/pack-manifest.json' });
  assert.equal(new Set(plan.map(item => item.target)).size, plan.length, 'Duplicate document destination');
  return plan;
}

function localLinks(content) {
  return [...content.matchAll(/\]\(([^)]+)\)/g)]
    .map(match => match[1])
    .filter(link => !/^(?:https?:|mailto:|#)/.test(link))
    .map(link => decodeURIComponent(link.split('#')[0]));
}

function validateDocuments(root, manifest) {
  const plan = documentationPlan(root, manifest);
  const destinations = new Set(plan.map(item => item.target));
  for (const { source, target } of plan) {
    if (!source.endsWith('.md')) continue;
    const content = fs.readFileSync(path.join(root, source), 'utf8');
    assert(!/\/Users\/|\/home\/[^\s/]+\/|[A-Z]:\\Users\\/.test(content), `Personal filesystem path in document: ${source}`);
    for (const link of localLinks(content)) {
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(target), link));
      assert(destinations.has(resolved), `Missing installed document reference: ${target} -> ${link}`);
    }
  }
  // Project template links intentionally target the installed layout, checked above.
  for (const relative of ['README.md', 'CONTRIBUTING.md', 'EVALUATION.md', 'templates/CLAUDE.md']) {
    const content = fs.readFileSync(path.join(root, relative), 'utf8');
    for (const link of localLinks(content)) {
      const resolved = path.resolve(root, path.dirname(relative), link);
      assert(!path.relative(root, resolved).startsWith('..') && fs.existsSync(resolved), `Missing repository reference: ${relative} -> ${link}`);
    }
  }
  return plan.length;
}

export function validateKit(root = kitRoot) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
  assert(/^\d+\.\d+\.\d+$/.test(manifest.version), 'Invalid pack version');
  assert.equal(manifest.skills.length, 12, 'Expected the finalized 12 skills');
  assert.equal(new Set(manifest.skills).size, manifest.skills.length, 'Duplicate skill names');
  assert.equal(new Set(manifest.rules).size, manifest.rules.length, 'Duplicate rule names');
  for (const name of [...manifest.skills, ...manifest.rules]) {
    assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) && name.length < 64, `Invalid name: ${name}`);
  }
  const listedSkills = fs.readdirSync(path.join(root, 'skills')).sort();
  assert.deepEqual(listedSkills, [...manifest.skills].sort(), 'Unlisted or missing skill folder');
  let files = 0;
  for (const name of manifest.skills) {
    const directory = path.join(root, 'skills', name);
    const text = fs.readFileSync(path.join(directory, 'SKILL.md'), 'utf8');
    // This pack deliberately uses only two plain, single-line YAML fields.
    const frontmatter = text.match(/^---\nname: ([a-z0-9-]+)\ndescription: ([^\n]+)\n---\n/);
    assert(frontmatter && frontmatter[1] === name, `Invalid skill frontmatter: ${name}`);
    const description = frontmatter[2];
    assert(description.length < 1024 && !description.includes(': '), `Quote/shorten description: ${name}`);
    assert(text.length > frontmatter[0].length + 100, `Missing instructions: ${name}`);
    for (const relative of listFiles(directory)) {
      files++;
      if (!relative.endsWith('.md')) continue;
      const content = fs.readFileSync(path.join(directory, relative), 'utf8');
      assert(!/\[TODO:|\/Users\/|\/home\/[^\s/]+\/|[A-Z]:\\Users\\/.test(content), `Unfinished scaffold or personal filesystem path: ${name}/${relative}`);
      for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
        const link = match[1];
        if (/^https?:\/\//.test(link) || link.startsWith('#')) continue;
        const target = path.resolve(directory, path.dirname(relative), link.split('#')[0]);
        const relation = path.relative(directory, target);
        assert(relation && !relation.startsWith('..') && !path.isAbsolute(relation), `Reference leaves skill: ${name}/${relative}`);
        assert(fs.existsSync(target), `Missing reference: ${name}/${relative} -> ${link}`);
      }
    }
  }
  for (const name of manifest.rules) {
    const text = fs.readFileSync(path.join(root, 'templates', 'rules', `${name}.md`), 'utf8');
    assert(/^---\npaths:\n(?:  - "[^\n]+"\n)+---\n/.test(text), `Missing path-scoped frontmatter: ${name}`);
  }
  assert(fs.existsSync(path.join(root, 'templates', 'CLAUDE.md')), 'Missing project starter');
  return { manifest, skillFiles: files, documentFiles: validateDocuments(root, manifest) };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = validateKit();
    console.log(`Validated v${result.manifest.version}: ${result.manifest.skills.length} skills, ${result.skillFiles} skill files, ${result.manifest.rules.length} optional rules, and ${result.documentFiles} installable document files and their local links.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
