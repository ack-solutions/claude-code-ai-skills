import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { kitRoot, validateKit } from './validate.mjs';

export function packageKit(outputDirectory, root = kitRoot) {
  const directory = fs.realpathSync(outputDirectory);
  if (!fs.statSync(directory).isDirectory()) throw new Error('Choose an existing output directory.');
  const git = args => execFileSync('git', ['-C', root, ...args], { encoding: 'utf8' }).trim();
  if (fs.realpathSync(git(['rev-parse', '--show-toplevel'])) !== fs.realpathSync(root)) {
    throw new Error('Package from the skill repository root, not a parent application repository.');
  }
  if (git(['status', '--porcelain', '--untracked-files=all'])) {
    throw new Error('Commit and review all pack changes before packaging; the repository must be clean.');
  }
  const { manifest } = validateKit(root);
  const commit = git(['rev-parse', 'HEAD']);
  if (!/^[a-z0-9-]+$/.test(manifest.name)) throw new Error('Invalid archive package name.');
  const prefix = `${manifest.name}-${manifest.version}-${commit.slice(0, 12)}`;
  const archivePath = path.join(directory, `${prefix}.zip`);
  const checksumPath = `${archivePath}.sha256`;
  for (const target of [archivePath, checksumPath]) {
    try {
      fs.lstatSync(target);
      throw new Error(`Refusing to overwrite existing artifact: ${target}`);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  const archive = execFileSync('git', ['-C', root, 'archive', '--format=zip', `--prefix=${prefix}/`, commit], { maxBuffer: 32 * 1024 * 1024 });
  const sha256 = createHash('sha256').update(archive).digest('hex');
  fs.writeFileSync(archivePath, archive, { flag: 'wx' });
  fs.writeFileSync(checksumPath, `${sha256}  ${path.basename(archivePath)}\n`, { flag: 'wx' });
  return { version: manifest.version, commit, archivePath, checksumPath, sha256 };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 3) throw new Error('Usage: node package.mjs /existing/output/directory');
    console.log(JSON.stringify(packageKit(process.argv[2]), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
