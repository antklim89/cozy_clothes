import fs from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';
import { contactSchema, heroSchema, productSchema, testimonialSchema } from './schemas';

const BASE_PATH = './public/content';

const baseOneFileLoader = cache(async <T extends ZodRawShape>(filePath: string, schema: ZodObject<T>) => {
  try {
    const contentString = await fs.readFile(path.resolve(BASE_PATH, `${filePath}.json`), 'utf8');
    const contentJson = JSON.parse(contentString);
    if (contentJson.hidden === true) return null;
    contentJson.id = path.parse(filePath).name;
    return schema.parseAsync(contentJson);
  } catch (error) {
    throw new Error(`Load Error ${filePath}:\n ${error}`);
  }
});

const baseManyFilesLoader = cache(async <T extends ZodRawShape>(filesPath: string, schema: ZodObject<T>) => {
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
          throw new Error(`Load Error ${filesPath}/${fileName}:\n ${error}`);
        }
      }),
    );
    const filteredResults = results.filter((i) => Boolean(i) && i.hidden === false);

    return await schema.array().parseAsync(filteredResults);
  } catch (error) {
    throw new Error(`Load Error ${filesPath}:\n ${error}`);
  }
});

export const heroLoader = cache(() => {
  return baseOneFileLoader('hero', heroSchema);
});

export const productsLoader = cache(() => {
  return baseManyFilesLoader('products', productSchema);
});

export const testimonialsLoader = cache(() => {
  return baseManyFilesLoader('testimonials', testimonialSchema);
});

export const contactsLoader = cache(() => {
  return baseManyFilesLoader('contacts', contactSchema);
});

export const productLoader = cache((id: string) => {
  return baseOneFileLoader(`products/${id}`, productSchema);
});
