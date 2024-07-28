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
  'Leggings',
  'Shorts',
  'Romper',
  'Jumpsuit',
  'Hoodie',
  'Joggers',
  'Blazer',
];

const sizes = ['sx', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];
const colors = ['red', 'blue', 'yellow', 'pink'];
const images = await fs.readdir(path.resolve('./public/images/products'));
const testimonialImages = await fs.readdir(path.resolve('./public/images/testimonials'));

const PRODUCTS_NUMBER = 10;
const TESTIMONIALS_NUMBER = 1;

generateTestimonials();
generateProducts();

async function generateProducts() {
  const products = Array.from({ length: PRODUCTS_NUMBER }, async () => {
    const createdAt = faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2024-01-01T00:00:00.000Z' });
    const title = faker.commerce.productName();
    const imageSrc = `/images/products/${images[faker.number.int({ min: 0, max: images.length - 1 })]}`;

    const product = {
      discount: faker.number.int({ min: 0, max: 90 }),
      price: faker.number.int({ min: 10, max: 90000 }),
      hidden: false,
      imagePreview: imageSrc,
      title: title,
      images: [imageSrc],
      createdAt: createdAt,
      description: faker.commerce.productDescription(),
      category: categories[faker.number.int({ min: 0, max: categories.length - 1 })],
      options: {
        sizes: sizes,
        colors: colors,
      },
    };

    const fileName = generateFileName(title, createdAt);
    await fs.writeFile(path.resolve('./public/content/products', `${fileName}.json`), JSON.stringify(product, null, 2));
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
  const slug = toCebabCase(title);
  return `${year}${month}${day}${hours}${minutes}${seconds}-${slug}.json`;
}

function toCebabCase(str) {
  return str
    .replace(/([A-Z])([A-Z])([a-z])/g, '$1-$2$3')
    .replace(/([^\w\d]|_)+/g, '-')
    .toLowerCase();
}
