import fs from 'node:fs/promises';
import path from 'node:path';
import type { ZodObject, ZodRawShape } from 'zod';
import { heroSchema, productSchema } from './schemas';

const BASE_PATH = './public/content';

async function baseOneFileLoader<T extends ZodRawShape>(filePath: string, schema: ZodObject<T>) {
  const contentString = await fs.readFile(path.resolve(BASE_PATH, `${filePath}.json`), 'utf8');
  const contentJson = JSON.parse(contentString);
  return schema.parseAsync(contentJson);
}

async function baseManyFilesLoader<T extends ZodRawShape>(filesPath: string, schema: ZodObject<T>) {
  const fileNames = await fs.readdir(path.resolve(BASE_PATH, filesPath));
  return Promise.all(
    fileNames.map(async (fileName) => {
      const contentString = await fs.readFile(path.resolve(BASE_PATH, filesPath, fileName), 'utf8');
      const contentJson = JSON.parse(contentString);
      contentJson.id = path.parse(fileName).name;
      return schema.parseAsync(contentJson);
    }),
  );
}

export function heroLoader() {
  return baseOneFileLoader('hero', heroSchema);
}

export function productsLoader() {
  return baseManyFilesLoader('products', productSchema);
}
