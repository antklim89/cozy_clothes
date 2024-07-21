import fs from 'node:fs/promises';
import path from 'node:path';
import type { ZodObject, ZodRawShape } from 'zod';
import { heroSchema, productSchema } from './schemas';

const BASE_PATH = './public/content';

async function baseOneFileLoader<T extends ZodRawShape>(filePath: string, schema: ZodObject<T>) {
  try {
    const contentString = await fs.readFile(path.resolve(BASE_PATH, `${filePath}.json`), 'utf8');
    const contentJson = JSON.parse(contentString);
    contentJson.id = path.parse(filePath).name;
    return schema.parseAsync(contentJson);
  } catch (error) {
    console.error(`Load Error ${filePath}:\n`, error);
    throw error;
  }
}

async function baseManyFilesLoader<T extends ZodRawShape>(filesPath: string, schema: ZodObject<T>) {
  try {
    const fileNames = await fs.readdir(path.resolve(BASE_PATH, filesPath));
    const results = await Promise.all(
      fileNames.map(async (fileName) => {
        try {
          const contentString = await fs.readFile(path.resolve(BASE_PATH, filesPath, fileName), 'utf8');
          const contentJson = JSON.parse(contentString);
          contentJson.id = path.parse(fileName).name;
          return contentJson;
        } catch (error) {
          console.error(error);
          throw new Error(`Load Error ${fileName}/${filesPath}.`);
        }
      }),
    );
    return await schema.array().parseAsync(results);
  } catch (error) {
    console.error(error);
    throw Error(`Load Error ${filesPath}.`);
  }
}

export function heroLoader() {
  return baseOneFileLoader('hero', heroSchema);
}

export function productsLoader() {
  return baseManyFilesLoader('products', productSchema);
}

export function productLoader(id: string) {
  return baseOneFileLoader(`products/${id}`, productSchema);
}
