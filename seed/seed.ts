/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: ok */
/** biome-ignore-all lint/suspicious/noConsole: ok */
/** biome-ignore-all lint/performance/noAwaitInLoops: ok */
import fs from 'node:fs/promises';
import path from 'node:path';
import { faker } from '@faker-js/faker';
import configPromise from '@payload-config';
import { type CollectionSlug, getPayload } from 'payload';

import type { ProductBase } from '@/shared/model/types/payload-types.generated';

await clear();

const USERS_NUMBER = 90;
const CONTACTS_NUMBER = 6;
const CATEGORIES_NUMBER = 10;
const COUNTRIES_NUMBER = 10;
const PRODUCT_BASES_LENGTH = 20;
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
  if (collection.slug === 'feedback') return;
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

function sliceRandom<T>(arr: readonly T[], max?: number): T[] {
  return arr.slice(0, faker.number.int({ min: 1, max: max ?? arr.length - 1 }));
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
  await fs.rm(path.resolve('database.db')).catch(() => null);
  await fs.rm(path.resolve('media'), { force: true, recursive: true });
  await fs.mkdir(path.resolve('media'));
}

async function getImages<T extends CollectionSlug>(collection: T, imagesPath: string) {
  const imagesDir = path.resolve('seed/placeholders', imagesPath);
  const imagesNames = await fs.readdir(imagesDir);

  const images: { id: number }[] = [];
  for (const imageName of imagesNames) {
    const image = await payload.create({
      collection,
      data: {} as never,
      filePath: path.resolve(imagesDir, imageName),
    });
    images.push(image);
  }
  return images;
}

async function createUsers() {
  for (let index = 0; index < USERS_NUMBER; index++) {
    const firstName = Math.random() > 0.4 ? faker.person.firstName() : undefined;
    const lastName = Math.random() > 0.4 ? faker.person.lastName() : undefined;
    const address = Math.random() > 0.4 ? faker.location.streetAddress() : undefined;
    const phone = Math.random() > 0.4 ? faker.phone.number({ style: 'international' }) : undefined;

    await payload.create({
      collection: 'users',
      data: {
        email: faker.internet.email({ firstName, lastName }),
        password: 'qwer1234',
        firstName,
        lastName,
        address,
        phone,
      },
    });
  }
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

async function createCategories() {
  for (let index = 0; index < CATEGORIES_NUMBER; index++) {
    await payload.create({
      collection: 'product-categories',
      data: {
        name: faker.commerce.productMaterial(),
      },
    });
  }
}

async function createCountries() {
  for (let index = 0; index < COUNTRIES_NUMBER; index++) {
    await payload.create({
      collection: 'product-countries',
      data: {
        name: faker.location.country(),
      },
    });
  }
}

async function createSizes() {
  for (const size of SIZES) {
    try {
      await payload.create({
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
    } catch {
      return;
    }
  }
}

async function createColors() {
  for (const colors of COLORS) {
    try {
      await payload.create({
        collection: 'product-colors',
        data: colors,
      });
    } catch {
      return;
    }
  }
}

async function createFeedbacks() {
  const images = await getImages('feedback-media', 'products');
  const products = await payload.find({
    collection: 'products',
    pagination: false,
    limit: Number.MAX_SAFE_INTEGER,
  });
  const users = await payload.find({
    collection: 'users',
    pagination: false,
    limit: Number.MAX_SAFE_INTEGER,
  });

  for (const product of products.docs) {
    for (const user of users.docs) {
      if (Math.random() > 0.8) continue;
      await payload.create({
        collection: 'feedback',
        data: {
          product: product.id,
          rating: Math.random() > 0.8 ? faker.number.int({ min: 1, max: 3 }) : faker.number.int({ min: 4, max: 5 }),
          user: user.id,
          review: Math.random() > 0.4 ? faker.lorem.text() : undefined,
          positiveReview: Math.random() > 0.4 ? faker.lorem.text() : undefined,
          negativeReview: Math.random() > 0.4 ? faker.lorem.text() : undefined,
          images: Math.random() > 0.6 ? sliceRandom(shuffle(images), 5).map(i => i.id) : undefined,
        },
      });
    }
  }
}

async function createProductBases() {
  const categories = await payload.find({
    collection: 'product-categories',
    pagination: false,
    limit: Number.MAX_SAFE_INTEGER,
  });
  const countries = await payload.find({
    collection: 'product-countries',
    pagination: false,
    limit: Number.MAX_SAFE_INTEGER,
  });

  const images = await getImages('product-media', 'products');

  for (let index = 0; index < PRODUCT_BASES_LENGTH; index++) {
    const category = getRandomItem(categories.docs);
    const country = getRandomItem(countries.docs);

    await payload.create({
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
  }
}

async function createProducts() {
  const images = await getImages('product-media', 'products');
  const productBases = await payload.find({
    collection: 'product-bases',
    pagination: false,
    limit: Number.MAX_SAFE_INTEGER,
  });
  const colors = await payload.find({
    collection: 'product-colors',
    pagination: false,
    limit: Number.MAX_SAFE_INTEGER,
  });
  const sizes = await payload.find({
    collection: 'product-sizes',
    pagination: false,
    limit: Number.MAX_SAFE_INTEGER,
  });

  for (const productBase of productBases.docs) {
    for (const color of colors.docs) {
      for (const size of sizes.docs) {
        if (Math.random() > 0.05) continue;

        await payload.create({
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
      }
    }
  }
}

async function createTestimonials() {
  const images = await getImages('testimonials-media', 'testimonials');

  for (const image of images) {
    await payload.create({
      collection: 'testimonials',
      data: {
        image: image.id,
        text: faker.lorem.text(),
        name: faker.person.fullName(),
      },
    });
  }
}

async function createContacts() {
  for (let index = 0; index < CONTACTS_NUMBER; index++) {
    await payload.db.create({
      collection: 'contacts',
      data: {
        email: faker.internet.email(),
        phone: faker.phone.number({ style: 'national' }),
        title: faker.lorem.words(3),
      },
    });
  }
}

console.log('START');
try {
  await createUsers();
  console.log('🚀 ~ createUsers');

  await createAbout();
  console.log('🚀 ~ createAbout');
  await createHero();
  console.log('🚀 ~ createHero');
  await createSeo();
  console.log('🚀 ~ createSeo');
  await createContacts();
  console.log('🚀 ~ createContacts');
  await createTestimonials();
  console.log('🚀 ~ createTestimonials');

  await createCategories();
  console.log('🚀 ~ createCategories');
  await createCountries();
  console.log('🚀 ~ createCountries');
  await createSizes();
  console.log('🚀 ~ createSizes');
  await createColors();
  console.log('🚀 ~ createColors');
  await createProductBases();
  console.log('🚀 ~ createProductBases');
  await createProducts();
  console.log('🚀 ~ createProducts');

  await createFeedbacks();
  console.log('🚀 ~ createFeedbacks');
} catch (error) {
  console.dir(error, { depth: 50, compact: false });
}
