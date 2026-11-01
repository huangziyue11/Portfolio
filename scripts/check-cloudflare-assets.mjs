import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

// This project's .assetsignore deliberately uses exact root-relative filenames.
const ignored = new Set((await readFile('dist/.assetsignore', 'utf8'))
  .split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('#'))
  .map(line => line.replace(/^\//, '')));
let count = 0;
const oversized = [];
async function check(folder, prefix = '') {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const relative = prefix + entry.name;
    if (ignored.has(relative) || relative === '.assetsignore') continue;
    const file = path.join(folder, entry.name);
    if (entry.isDirectory()) await check(file, relative + '/');
    else {
      count++;
      const { size } = await stat(file);
      if (size > 25 * 1024 * 1024) oversized.push(`${relative}: ${(size / 1024 ** 2).toFixed(2)} MiB`);
    }
  }
}
await check('dist');
if (oversized.length) throw new Error('Cloudflare assets exceed 25 MiB:\n' + oversized.join('\n'));
console.log(`Cloudflare asset check passed: ${count} files, each at most 25 MiB.`);
