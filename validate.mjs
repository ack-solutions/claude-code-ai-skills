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

export function validateKit(root = kitRoot) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
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
  return { manifest, skillFiles: files };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = validateKit();
    console.log(`Validated ${result.manifest.skills.length} skills, ${result.skillFiles} skill files, and ${result.manifest.rules.length} optional rules.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
