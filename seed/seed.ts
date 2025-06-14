/* eslint-disable antfu/no-top-level-await */
import fs from 'node:fs/promises';
import path from 'node:path';
import { faker } from '@faker-js/faker';
import type { CollectionSlug } from 'payload';
import { getPayload } from 'payload';
import type { Product } from '@/payload-types';
import { SIZES } from '@/src/shared/config';
import config from '../payload.config';


const CONTACTS_NUMBER = 6;
const CATEGORIES_NUMBER = 10;
const COUNTRIES_NUMBER = 10;
const VARIANTS_NUMBER = 20;
const PRODUCTS_NUMBER = 100;

const payload = await getPayload({ config });

function getRandomItem<T>(arr: readonly T[]): T {
  const result = arr[faker.number.int({ min: 0, max: arr.length - 1 })];
  if (result == null) throw new Error(`An array in getRandomItem is empty.`);
  return result;
}

function shuffle<T>(arr: readonly T[]): T[] {
  return arr.toSorted(() => Math.random() - 0.5);
}

function sliceRandom<T>(arr: readonly T[]): T[] {
  return arr.slice(0, faker.number.int({ min: 1, max: arr.length - 1 }));
}

function createRichText(textArr: string[]): Product['description'] {
  return {
    root: {
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      children: textArr.map(text => ({
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            text,
            type: 'text',
          },
        ],
        type: 'paragraph',
      })),
      type: 'root',
    },
  };
}

const colors = Array.from({ length: 20 }, () => ({
  name: faker.lorem.word(),
  code: faker.internet.color(),
}));

async function getImages(collection: Extract<CollectionSlug, 'about-media' | 'testimonials-media' | 'product-media' | 'hero-media'>, imagesPath: string) {
  const imagesDir = path.resolve('seed/placeholders', imagesPath);
  const imagesNames = await fs.readdir(imagesDir);

  const images = await Promise.all(imagesNames.map(async (imageName) => {
    return payload.create({
      collection,
      data: {} as never,
      filePath: path.resolve(imagesDir, imageName),
    });
  }));
  return images;
}

async function clear() {
  // await payload.db.migrateFresh({ forceAcceptWarning: true });
  await fs.rm(path.resolve('media'), { force: true, recursive: true });
  await fs.mkdir(path.resolve('media'));
}

async function createAbout() {
  const [image] = await getImages('about-media', 'about');
  if (image == null) throw new Error('No about image.');

  await payload.updateGlobal({
    slug: 'About',
    data: {
      text: createRichText([faker.lorem.paragraph(), faker.lorem.paragraph(), faker.lorem.paragraph()]),
    },
  });
}

async function createSeo() {
  await payload.updateGlobal({
    slug: 'Seo',
    data: {
      creator: faker.person.fullName(),
      title: 'Cozy Clothes',
      keywords: ['shop', 'clothes', 'cozy'],
      description: faker.lorem.text(),
    },
  });
}

async function createHero() {
  const [image] = await getImages('hero-media', 'hero');
  if (image == null) throw new Error('No hero image.');

  await payload.updateGlobal({
    slug: 'Hero',
    data: {
      image,
      text: createRichText([faker.lorem.text()]),
    },
  });
}

async function createCategories() {
  return Promise.all(Array.from({ length: CATEGORIES_NUMBER }, async () => {
    return payload.create({
      collection: 'product-categories',
      data: {
        name: faker.commerce.productMaterial(),
      },
    });
  }));
}

async function createCountries() {
  return Promise.all(Array.from({ length: COUNTRIES_NUMBER }, async () => {
    return payload.create({
      collection: 'product-countries',
      data: {
        name: faker.location.country(),
      },
    });
  }));
}

async function createProductVariants(products: Product[]) {
  return Promise.all(products.map(async (product) => {
    return Promise.all(Array.from({ length: faker.number.int({ min: 1, max: VARIANTS_NUMBER }) }, async () => {
      const { name: colorName, code: colorCode } = getRandomItem(colors);
      const size = getRandomItem(SIZES);

      return payload.create({
        collection: 'product-variants',
        data: {
          colorName,
          colorCode,
          size,
          product: product.id,
        },
      });
    }));
  }));
}

async function createProducts() {
  const categories = await createCategories();
  const countries = await createCountries();
  const images = await getImages('product-media', 'products');

  const products = await Promise.all(Array.from({ length: PRODUCTS_NUMBER }, async () => {
    const category = getRandomItem(categories);
    const country = getRandomItem(countries);

    return payload.create({
      collection: 'products',
      data: {
        category: category.id,
        country: country.id,
        description: createRichText([faker.lorem.text()]),
        discount: Math.random() > 0.5 ? faker.number.int({ min: 5, max: 90 }) : 0,
        price: faker.number.float({ min: 900, max: 900000, fractionDigits: 2 }),
        title: faker.commerce.productName(),
        images: sliceRandom(shuffle(images)).map(i => i.id),
      },
    });
  }));

  await createProductVariants(products);
}

async function createTestimonials() {
  const images = await getImages('testimonials-media', 'testimonials');

  return Promise.all(images.map(async (image) => {
    return payload.create({
      collection: 'testimonials',
      data: {
        image: image.id,
        text: faker.lorem.text(),
        name: faker.person.fullName(),
      },
    });
  }));
}

async function createContacts() {
  return Promise.all(Array.from({ length: CONTACTS_NUMBER }, async () => {
    return payload.create({
      collection: 'contacts',
      data: {
        email: faker.internet.email(),
        phone: faker.phone.number({ style: 'national' }),
        title: faker.lorem.words(3),
      },
    });
  }));
}

await clear();

await Promise.all([
  createAbout(),
  createHero(),
  createSeo(),
  createContacts(),
  createProducts(),
  createTestimonials(),
]);
