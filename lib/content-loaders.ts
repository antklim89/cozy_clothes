import { cache } from 'react';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { ZodObject, ZodRawShape } from 'zod';
import {
  aboutSchema,
  contactSchema,
  heroSchema,
  infoSchema,
  productSchema,
  testimonialSchema,
} from './schemas';


const BASE_PATH = './public/content';

const baseOneFileLoader = cache(async <T extends ZodRawShape>(filePath: string, schema: ZodObject<T>) => {
  try {
    const contentString = await fs.readFile(path.resolve(BASE_PATH, `${filePath}.json`), 'utf8');
    const contentJson = JSON.parse(contentString) as Record<string, unknown>;
    contentJson.id = path.parse(filePath).name;
    return await schema.parseAsync(contentJson);
  } catch (error) {
    throw new Error(`Load Error ${filePath}:\n ${error instanceof Error ? error.message : ''}`);
  }
});

const baseManyFilesLoader = cache(async <T extends ZodRawShape>(filesPath: string, schema: ZodObject<T>) => {
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

    return await schema.array().parseAsync(filteredResults);
  } catch (error) {
    throw new Error(`Load Error ${filesPath}:\n ${error instanceof Error ? error.message : ''}`);
  }
});

export const heroLoader = cache(async () => {
  return baseOneFileLoader('hero', heroSchema);
});

export const aboutLoader = cache(async () => {
  return baseOneFileLoader('about', aboutSchema);
});

export const infoLoader = cache(async () => {
  return baseOneFileLoader('info', infoSchema);
});

export const productsLoader = cache(async () => {
  return baseManyFilesLoader('products', productSchema);
});

export const testimonialsLoader = cache(async () => {
  return baseManyFilesLoader('testimonials', testimonialSchema);
});

export const contactsLoader = cache(async () => {
  return baseManyFilesLoader('contacts', contactSchema);
});

export const productLoader = cache(async (id: string) => {
  return baseOneFileLoader(`products/${id}`, productSchema);
});
