import fs from 'node:fs/promises';
import path from 'node:path';
import { type ZodObject, type ZodRawShape, z } from 'zod';
import { heroSchema } from './schemas';

const BASE_PATH = './public/content';

interface Options {
  start?: number;
  skip?: number;
}

async function baseOneFileLoader<T extends ZodRawShape>(filePath: string, schema: ZodObject<T>) {
  const contentString = await fs.readFile(path.resolve(BASE_PATH, `${filePath}.json`), 'utf8');
  const contentJson = JSON.parse(contentString);
  return schema.parseAsync(contentJson);
}

async function baseManyFilesLoader<T extends ZodRawShape>(
  filesPath: string,
  schema: ZodObject<T>,
  { start = 0, skip = Number.POSITIVE_INFINITY }: Options = {},
) {
  const fileNames = await fs.readdir(path.resolve(BASE_PATH, filesPath));
  return Promise.all(
    fileNames.slice(start, start + skip).map(async (fileName) => {
      const contentString = await fs.readFile(path.resolve(BASE_PATH, filesPath, fileName), 'utf8');
      const contentJson = JSON.parse(contentString);
      return schema.parseAsync(contentJson);
    }),
  );
}

export function heroLoader() {
  return baseOneFileLoader('hero', heroSchema);
}

export function productsLoader(opts: Options = {}) {
  return baseManyFilesLoader('products', z.object({ title: z.string() }), opts);
}
