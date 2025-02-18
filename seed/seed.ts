/* eslint-disable no-restricted-imports */
/* eslint-disable antfu/no-top-level-await */
import fs from 'node:fs/promises';
import path from 'node:path';
import { faker } from '@faker-js/faker';
import { getPayload } from 'payload';
import type { CollectionSlug, DataFromCollectionSlug } from 'payload';
import type { Category, Product } from '../payload-types';
import config from '../payload.config';


const CONTACTS_NUMBER = 6;
const CATEGORIES_NUMBER = 10;
const PRODUCTS_NUMBER = 100;

const payload = await getPayload({ config });

function getRandomItem<T>(arr: T[]): T {
  const result = arr[faker.number.int({ min: 0, max: arr.length - 1 })];
  if (result == null) throw new Error(`An array in getRandomItem is empty.`);
  return result;
}

function shuffle<T>(arr: T[]): T[] {
  return arr.toSorted(() => Math.random() - 0.5);
}

function sliceRandom<T>(arr: T[]): T[] {
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

async function getImages(collection: CollectionSlug, imagesPath: string) {
  const imagesDir = path.resolve('seed/placeholders', imagesPath);
  const imagesNames = await fs.readdir(imagesDir);

  const images = await Promise.all(imagesNames.map(async (imageName) => {
    return payload.create({
      collection,
      data: {},
      filePath: path.resolve(imagesDir, imageName),
    });
  }));
  return images;
}

async function clear() {
  await payload.db.migrateFresh({ forceAcceptWarning: true });
  await fs.rm(path.resolve('media'), { force: true, recursive: true });
  await fs.mkdir(path.resolve('media'));
}

async function createAbout(image: DataFromCollectionSlug<CollectionSlug>) {
  await payload.updateGlobal({
    slug: 'About',
    data: {
      text: createRichText([faker.lorem.paragraph(), faker.lorem.paragraph(), faker.lorem.paragraph()]),
      values: createRichText([faker.lorem.text()]),
      valuesList: Array.from({ length: 6 }, () => ({
        text: faker.lorem.paragraph(3),
        title: faker.company.catchPhrase(),
      })),
      image,
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

async function createHero(image: DataFromCollectionSlug<CollectionSlug>) {
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
      collection: 'categories',
      data: {
        name: faker.commerce.productMaterial(),
      },
    });
  }));
}

async function createProducts(categories: Category[], images: DataFromCollectionSlug<CollectionSlug>[]) {
  return Promise.all(Array.from({ length: PRODUCTS_NUMBER }, async () => {
    const category = getRandomItem(categories);

    return payload.create({
      collection: 'products',
      data: {
        category: category.id,
        description: createRichText([faker.lorem.text()]),
        discount: Math.random() > 0.5 ? faker.number.int({ min: 5, max: 90 }) : 0,
        price: faker.number.float({ min: 900, max: 900000, fractionDigits: 2 }),
        title: faker.commerce.productName(),
        images: sliceRandom(shuffle(images)).map(i => i.id),
      },
    });
  }));
}

async function createTestimonials(images: DataFromCollectionSlug<CollectionSlug>[]) {
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


const [aboutImage] = await getImages('about-media', 'about');
if (aboutImage == null) throw new Error('No about image.');

const [heroImage] = await getImages('hero-media', 'hero');
if (heroImage == null) throw new Error('No hero image.');

const productImages = await getImages('products-media', 'products');
const testimonialsImages = await getImages('testimonials-media', 'testimonials');

await createAbout(aboutImage);
await createHero(heroImage);
await createSeo();
await createContacts();

const categories = await createCategories();
await createProducts(categories, productImages);

await createTestimonials(testimonialsImages);
