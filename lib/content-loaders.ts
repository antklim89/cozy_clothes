import fs from 'node:fs/promises';
import path from 'node:path';
import NodeCache from 'node-cache';
import type { z, ZodObject, ZodRawShape } from 'zod';
import {
  aboutSchema,
  contactSchema,
  heroSchema,
  infoSchema,
  productSchema,
  testimonialSchema,
} from './schemas';


const cache = new NodeCache({ stdTTL: 60 * 60 });

const BASE_PATH = './public/content';

async function baseOneFileLoader<T extends ZodRawShape>(filePath: string, schema: ZodObject<T>): Promise<z.infer<ZodObject<T>>> {
  if (cache.has(filePath)) return cache.get(filePath) as z.infer<ZodObject<T>>;

  try {
    const contentString = await fs.readFile(path.resolve(BASE_PATH, `${filePath}.json`), 'utf8');
    const contentJson = JSON.parse(contentString) as Record<string, unknown>;
    contentJson.id = path.parse(filePath).name;
    const result = await schema.parseAsync(contentJson);
    cache.set(filePath, result);
    return result;
  } catch (error) {
    throw new Error(`Load Error ${filePath}:\n ${error instanceof Error ? error.message : ''}`);
  }
}

async function baseManyFilesLoader<T extends ZodRawShape>(filesPath: string, schema: ZodObject<T>): Promise<z.infer<ZodObject<T>>[]> {
  if (cache.has(filesPath)) return cache.get(filesPath) as z.infer<ZodObject<T>>[];
  try {
    const fileNames = await fs.readdir(path.resolve(BASE_PATH, filesPath));
    const results = await Promise.all(
      fileNames.map(async (fileName) => {
        try {
          const contentString = await fs.readFile(path.resolve(BASE_PATH, filesPath, fileName), 'utf8');
          const contentJson = JSON.parse(contentString) as Record<string, unknown>;
          contentJson.id = path.parse(fileName).name;
          return contentJson;
        } catch (error) {
          throw new Error(`Load Error ${filesPath}/${fileName}:\n ${error instanceof Error ? error.message : ''}`);
        }
      }),
    );
    const filteredResults = results.filter(i => (i != null) && (i.hidden === false));

    const result = await schema.array().parseAsync(filteredResults);
    cache.set(filesPath, result);
    return result;
  } catch (error) {
    throw new Error(`Load Error ${filesPath}:\n ${error instanceof Error ? error.message : ''}`);
  }
}

export async function heroLoader() {
  return baseOneFileLoader('hero', heroSchema);
}

export async function aboutLoader() {
  return baseOneFileLoader('about', aboutSchema);
}

export async function infoLoader() {
  return baseOneFileLoader('info', infoSchema);
}

export async function productsLoader() {
  return baseManyFilesLoader('products', productSchema);
}

export async function testimonialsLoader() {
  return baseManyFilesLoader('testimonials', testimonialSchema);
}

export async function contactsLoader() {
  return baseManyFilesLoader('contacts', contactSchema);
}

export async function productLoader(id: string) {
  return baseOneFileLoader(`products/${id}`, productSchema);
}
