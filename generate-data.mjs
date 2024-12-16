/* eslint-disable antfu/no-top-level-await */
import fs from 'node:fs/promises';
import path from 'node:path';
import { faker } from '@faker-js/faker';


const categories = [
  'T-shirt',
  'Jeans',
  'Dress',
  'Skirt',
  'Blouse',
  'Suit',
  'Coat',
  'Sweater',
  'Shorts',
  'Hoodie',
  'Joggers',
];

const sizes = ['sx', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];
const colors = [
  { name: 'Oxford Blue', code: '#031D44' },
  { name: 'Mindaro', code: '#C3E991' },
  { name: 'Butterscotch', code: '#CB904D' },
  { name: 'Chocolate cosmos', code: '#4C191B' },
  { name: 'Lavender', code: '#C589E8' },
  { name: 'Ultra Violet', code: '#52489C' },
  { name: 'Bright pink', code: '#F45B69' },
  { name: 'Yellow', code: '#F7B801' },
  { name: 'Black', code: '#02010A' },
  { name: 'Blue', code: '#0D00A4' },
  { name: 'White', code: 'white' },
  { name: 'Green', code: 'green' },
  { name: 'Purple', code: 'purple' },
];
const productImages = await fs.readdir(path.resolve('./public/images/products'));
const testimonialImages = await fs.readdir(path.resolve('./public/images/testimonials'));

const PRODUCTS_NUMBER = 200;
const TESTIMONIALS_NUMBER = 0;

generateTestimonials();
generateProducts();

async function generateProducts() {
  const products = Array.from({ length: PRODUCTS_NUMBER }, async () => {
    const createdAt = faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2024-01-01T00:00:00.000Z' });
    const title = faker.commerce.productName();
    const productImagesPaths = productImages.map(i => path.join('/images/products', i));
    const imageSrc = productImagesPaths[faker.number.int({ min: 0, max: productImages.length - 1 })];

    /** @type {import('./lib/schemas').ProductType} */
    const product = {
      discount: rand() ? faker.number.int({ min: 10, max: 90 }) : 0,
      price: faker.number.int({ min: 10, max: 90000 }),
      hidden: false,
      imagePreview: imageSrc,
      title,
      images: productImagesPaths.filter(rand),
      createdAt,
      description: faker.commerce.productDescription(),
      category: categories[faker.number.int({ min: 0, max: categories.length - 1 })],
      options: {},
    };

    if (rand()) product.options.sizes = sizes.filter(rand);
    if (rand()) product.options.colors = colors.filter(rand);

    const fileName = generateFileName(title, createdAt);
    await fs.writeFile(path.resolve('./public/content/products', fileName), JSON.stringify(product, null, 2));
  });
  await Promise.all(products);
}

async function generateTestimonials() {
  const testimonials = Array.from({ length: TESTIMONIALS_NUMBER }, async () => {
    const name = faker.person.fullName();

    const imageSrc = `/images/testimonials/${testimonialImages[faker.number.int({ min: 0, max: testimonialImages.length - 1 })]}`;
    const createdAt = faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2024-01-01T00:00:00.000Z' });

    const testimonial = {
      hidden: false,
      image: imageSrc,
      text: faker.lorem.paragraph(),
      name,
    };

    const fileName = generateFileName(name, createdAt);

    await fs.writeFile(path.resolve('./public/content/testimonials', fileName), JSON.stringify(testimonial, null, 2));
  });
  await Promise.all(testimonials);
}

function generateFileName(title, createdAt) {
  const year = createdAt.getFullYear();
  const month = createdAt.getMonth();
  const day = createdAt.getDay();
  const hours = createdAt.getHours();
  const minutes = createdAt.getMinutes();
  const seconds = createdAt.getSeconds();
  const slug = toKebabCase(title);
  return `${year}${month}${day}${hours}${minutes}${seconds}-${slug}.json`;
}

function toKebabCase(str) {
  return str
    .replace(/([A-Z])([A-Z])([a-z])/g, '$1-$2$3')
    .replace(/(\W|_)+/g, '-')
    .toLowerCase();
}

function rand() {
  return Math.random() > 0.5;
}
