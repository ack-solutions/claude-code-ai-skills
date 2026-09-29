import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { documentationPlan, kitRoot, listFiles, validateKit } from './validate.mjs';

const usage = `Install the finalized Claude Code skills without overwriting files.

  node install.mjs /path/to/project [--rules=nestjs-api,react-admin,database-contracts] [--starter] [--docs] [--dry-run]
  node install.mjs --global [--dry-run]

Project: copies all skills into .claude/skills in an existing project directory.
--rules: optionally copies only the named framework rule templates; adapt their paths to the project.
--starter: creates CLAUDE.md only if absent or identical to this starter.
--docs: copies project documents and the engineering playbook into docs; it does not approve their proposals.
--global: copies skills into CLAUDE_CONFIG_DIR/skills or the default ~/.claude/skills.
Existing identical files are skipped. Conflicts are reported before any copying.
No dependencies are installed and no Claude permissions or account settings are changed.`;

export function parseArgs(args) {
  const options = { project: undefined, global: false, rules: [], starter: false, docs: false, dryRun: false, help: false };
  for (const arg of args) {
    if (arg === '--global') options.global = true;
    else if (arg === '--starter') options.starter = true;
    else if (arg === '--docs') options.docs = true;
    else if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg.startsWith('--rules=')) options.rules.push(...arg.slice(8).split(',').filter(Boolean));
    else if (arg.startsWith('-')) throw new Error(`Unknown option: ${arg}`);
    else if (options.project) throw new Error('Specify exactly one project directory.');
    else options.project = arg;
  }
  if (options.help) return options;
  if (options.global && (options.project || options.rules.length || options.starter || options.docs)) {
    throw new Error('--global installs skills only; it cannot be combined with a project, rules, starter or docs.');
  }
  if (!options.global && !options.project) throw new Error('Specify a project directory or --global.');
  return options;
}

function inspectExistingChain(target) {
  let current = path.resolve(target);
  while (true) {
    try {
      const stat = fs.lstatSync(current);
      if (stat.isSymbolicLink()) throw new Error(`Refusing a symlink destination: ${current}`);
      if (current !== path.resolve(target) && !stat.isDirectory()) throw new Error(`Parent is not a directory: ${current}`);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
}

function exists(target) {
  try { fs.lstatSync(target); return true; } catch (error) { if (error.code === 'ENOENT') return false; throw error; }
}

export function install(options, root = kitRoot) {
  if (options.global && (options.project || options.rules.length || options.starter || options.docs)) {
    throw new Error('--global installs skills only; it cannot be combined with a project, rules, starter or docs.');
  }
  const { manifest } = validateKit(root);
  for (const rule of options.rules) if (!manifest.rules.includes(rule)) throw new Error(`Unknown rule: ${rule}`);
  let project;
  let config;
  if (options.global) {
    config = path.resolve(process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude'));
  } else {
    project = fs.realpathSync(path.resolve(options.project));
    if (!fs.statSync(project).isDirectory()) throw new Error('Project target must be an existing directory.');
    if (project === path.parse(project).root || project === fs.realpathSync(os.homedir())) {
      throw new Error('Choose a project directory, not the filesystem root or home directory.');
    }
    config = path.join(project, '.claude');
  }
  const planned = [];
  const conflicts = [];
  for (const name of manifest.skills) {
    const source = path.join(root, 'skills', name);
    const target = path.join(config, 'skills', name);
    const sourceFiles = listFiles(source);
    inspectExistingChain(target);
    if (exists(target)) {
      if (!fs.lstatSync(target).isDirectory()) conflicts.push(target);
      else {
        // Prevent mixing the pack with extra files belonging to another skill of the same name.
        for (const extra of listFiles(target).filter(file => !sourceFiles.includes(file))) conflicts.push(path.join(target, extra));
      }
    }
    for (const relative of sourceFiles) planned.push({ source: path.join(source, relative), target: path.join(target, relative) });
  }
  for (const name of new Set(options.rules)) {
    planned.push({ source: path.join(root, 'templates', 'rules', `${name}.md`), target: path.join(config, 'rules', `${name}.md`) });
  }
  if (options.starter) planned.push({ source: path.join(root, 'templates', 'CLAUDE.md'), target: path.join(project, 'CLAUDE.md') });
  if (options.docs) {
    for (const item of documentationPlan(root, manifest)) {
      planned.push({ source: path.join(root, item.source), target: path.join(project, item.target) });
    }
  }

  const pending = [];
  for (const item of planned) {
    inspectExistingChain(item.target);
    if (!exists(item.target)) pending.push(item);
    else if (!fs.lstatSync(item.target).isFile() || !fs.readFileSync(item.source).equals(fs.readFileSync(item.target))) conflicts.push(item.target);
  }
  if (conflicts.length) throw new Error(`Nothing copied. Existing content conflicts at:\n${[...new Set(conflicts)].map(file => `  ${file}`).join('\n')}\nCompare and merge intentionally, or use a different target. There is no force-overwrite option.`);
  if (!options.dryRun) {
    // Preflight catches normal conflicts. Exclusive copies also protect a file created after preflight.
    // If an I/O error interrupts copying, already copied files remain; rerunning safely skips identical files.
    for (const item of pending) {
      fs.mkdirSync(path.dirname(item.target), { recursive: true });
      fs.copyFileSync(item.source, item.target, fs.constants.COPYFILE_EXCL);
    }
  }
  return { target: config, copied: options.dryRun ? 0 : pending.length, pending: pending.length, identical: planned.length - pending.length, dryRun: options.dryRun };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const options = parseArgs(process.argv.slice(2));
    if (options.help) console.log(usage);
    else {
      const result = install(options);
      console.log(`${result.dryRun ? 'Preview' : 'Installed'}: ${result.target}`);
      console.log(`${result.dryRun ? result.pending + ' files would be copied' : result.copied + ' files copied'}; ${result.identical} identical files skipped.`);
      if (options.rules.length) console.log('Review the selected rules and adjust their paths for the target project.');
      if (options.docs) console.log('Review docs/README.md and complete docs/PROJECT_CONTEXT.md. Templates are not approved project decisions; no CI, tracker or agent team was configured.');
      console.log('Start Claude Code in the project, or reload its skills in an existing session.');
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
