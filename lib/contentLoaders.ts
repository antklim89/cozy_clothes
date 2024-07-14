import fs from 'node:fs/promises';
import path from 'node:path';

export async function heroLoader() {
  const heroStr = await fs.readFile(path.resolve('./public/content/hero.json'), 'utf8');
  const result = JSON.parse(heroStr) as typeof import('@/public/content/hero.json');
  return result;
}
