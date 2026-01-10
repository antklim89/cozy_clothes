import fs from 'node:fs/promises';
import path from 'node:path';
import { faker } from '@faker-js/faker';
import configPromise from '@payload-config';
import { type CollectionSlug, getPayload } from 'payload';

import type { ProductBase } from '@/shared/model/types/payload-types.generated';

const CONTACTS_NUMBER = 6;
const CATEGORIES_NUMBER = 10;
const COUNTRIES_NUMBER = 10;
const PRODUCT_BASES_LENGTH = 50;
const SIZES = ['xxs', 'xs', 'm', 'l', 'xl', 'xxl'] as const;
const COLORS = [
  { name: 'Crimson Red', code: '#DC143C' },
  { name: 'Navy Blue', code: '#000080' },
  { name: 'Forest Green', code: '#228B22' },
  { name: 'Charcoal Gray', code: '#36454F' },
  { name: 'Cream White', code: '#FFFDD0' },
  { name: 'Burgundy', code: '#800020' },
  { name: 'Mustard Yellow', code: '#FFDB58' },
  { name: 'Royal Purple', code: '#660099' },
  { name: 'Denim Blue', code: '#1560BD' },
  { name: 'Olive Green', code: '#808000' },
  { name: 'Coral Pink', code: '#FF7F50' },
  { name: 'Teal', code: '#008080' },
  { name: 'Chocolate Brown', code: '#654321' },
  { name: 'Lavender', code: '#E6E6FA' },
  { name: 'Turquoise', code: '#40E0D0' },
  { name: 'Black', code: '#000000' },
  { name: 'Blush Nude', code: '#FFCCCC' },
] as const;

const config = await configPromise;
config.collections.forEach(collection => {
  if (collection.slug.includes('media')) return;
  collection.hooks.afterChange = [];
  collection.hooks.afterDelete = [];
});
config.globals.forEach(global => {
  if (global.slug.includes('media')) return;
  global.hooks.afterChange = [];
});
const payload = await getPayload({ config });

function getRandomItem<T>(arr: readonly T[]): T {
  const result = arr[faker.number.int({ min: 0, max: arr.length - 1 })];
  if (result == null) throw new Error('An array in getRandomItem is empty.');
  return result;
}

function shuffle<T>(arr: readonly T[]): T[] {
  return arr.toSorted(() => Math.random() - 0.5);
}

function sliceRandom<T>(arr: readonly T[]): T[] {
  return arr.slice(0, faker.number.int({ min: 1, max: arr.length - 1 }));
}

function createRichText(textArr: string[]): ProductBase['description'] {
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

async function clear() {
  // await payload.db.migrateFresh({ forceAcceptWarning: true });
  await fs.rm(path.resolve('media'), { force: true, recursive: true });
  await fs.mkdir(path.resolve('media'));
}

async function getImages<T extends CollectionSlug>(collection: T, imagesPath: string) {
  const imagesDir = path.resolve('seed/placeholders', imagesPath);
  const imagesNames = await fs.readdir(imagesDir);

  const images = await Promise.all(
    imagesNames.map(imageName => {
      return payload.create({
        collection,
        data: {} as never,
        filePath: path.resolve(imagesDir, imageName),
      });
    }),
  );
  return images;
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
  const images = await getImages('seo-media', 'seo');
  await payload.updateGlobal({
    slug: 'Seo',
    data: {
      creator: faker.person.fullName(),
      title: 'Cozy Clothes',
      keywords: ['shop', 'clothes', 'cozy'],
      description: faker.lorem.text(),
      images,
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

function createCategories() {
  return Promise.all(
    Array.from({ length: CATEGORIES_NUMBER }, () => {
      return payload.create({
        collection: 'product-categories',
        data: {
          name: faker.commerce.productMaterial(),
        },
      });
    }),
  );
}

function createCountries() {
  return Promise.all(
    Array.from({ length: COUNTRIES_NUMBER }, () => {
      return payload.create({
        collection: 'product-countries',
        data: {
          name: faker.location.country(),
        },
      });
    }),
  );
}

function createSizes() {
  return Promise.all(
    SIZES.map(size => {
      return payload.create({
        collection: 'product-sizes',
        data: {
          name: size,
          bustSize: faker.number.float({ min: 2, max: 50, fractionDigits: 2 }),
          length: faker.number.float({ min: 2, max: 50, fractionDigits: 2 }),
          shoulderLength: faker.number.float({ min: 2, max: 50, fractionDigits: 2 }),
          sleeveLength: faker.number.float({ min: 2, max: 50, fractionDigits: 2 }),
          waistSize: faker.number.float({ min: 2, max: 50, fractionDigits: 2 }),
        },
      });
    }),
  );
}

function createColors() {
  return Promise.all(
    COLORS.map(data => {
      return payload.create({
        collection: 'product-colors',
        data,
      });
    }),
  );
}

async function createProducts(productBases: ProductBase[]) {
  const images = await getImages('product-media', 'products');
  const sizes = await createSizes();
  const colors = await createColors();

  return Promise.all(
    productBases.map(productBase => {
      return Promise.all(
        colors.map(color => {
          return Promise.all(
            sizes.map(size => {
              if (Math.random() > 0.2) return null;

              return payload.create({
                collection: 'products',
                data: {
                  _status: 'published',
                  title: faker.commerce.productName(),
                  description: createRichText([faker.lorem.text()]),
                  discount: Math.random() > 0.5 ? faker.number.int({ min: 5, max: 90 }) : 0,
                  price: faker.number.float({ min: 900, max: 900000, fractionDigits: 2 }),
                  imagePreview: getRandomItem(images).id,
                  images: sliceRandom(shuffle(images)).map(i => i.id),
                  color,
                  size,
                  productBase: productBase.id,
                },
              });
            }),
          );
        }),
      );
    }),
  );
}

async function createProductBases() {
  const categories = await createCategories();
  const countries = await createCountries();
  const images = await getImages('product-media', 'products');

  const products = await Promise.all(
    Array.from({ length: PRODUCT_BASES_LENGTH }, () => {
      const category = getRandomItem(categories);
      const country = getRandomItem(countries);

      return payload.create({
        collection: 'product-bases',
        data: {
          _status: 'published',
          title: faker.commerce.productName(),
          description: createRichText([faker.lorem.text()]),
          category: category.id,
          country: country.id,
          discount: Math.random() > 0.5 ? faker.number.int({ min: 5, max: 90 }) : 0,
          price: faker.number.float({ min: 900, max: 900000, fractionDigits: 2 }),
          images: sliceRandom(shuffle(images)).map(i => i.id),
        },
      });
    }),
  );

  await createProducts(products);
}

async function createTestimonials() {
  const images = await getImages('testimonials-media', 'testimonials');

  return Promise.all(
    images.map(image => {
      return payload.create({
        collection: 'testimonials',
        data: {
          image: image.id,
          text: faker.lorem.text(),
          name: faker.person.fullName(),
        },
      });
    }),
  );
}

function createContacts() {
  return Promise.all(
    Array.from({ length: CONTACTS_NUMBER }, () => {
      return payload.create({
        collection: 'contacts',
        data: {
          email: faker.internet.email(),
          phone: faker.phone.number({ style: 'national' }),
          title: faker.lorem.words(3),
        },
      });
    }),
  );
}
await clear();

await Promise.all([
  createAbout(),
  createHero(),
  createSeo(),
  createContacts(),
  createProductBases(),
  createTestimonials(),
]);
