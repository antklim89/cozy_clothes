import fs from 'node:fs/promises';
import path from 'node:path';
import type { ZodObject, ZodRawShape } from 'zod';
import { heroSchema } from './schemas';

export async function baseLoader<T extends ZodRawShape>(filePath: string, schema: ZodObject<T>) {
  const contentString = await fs.readFile(path.resolve('./public/content', `${filePath}.json`), 'utf8');
  const contentJson = JSON.parse(contentString);
  return schema.parseAsync(contentJson);
}

export function heroLoader() {
  return baseLoader('hero', heroSchema);
}
