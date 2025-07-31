import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { Admins } from './hidden/collections/Admins';
import { About } from './hidden/features/about/collections/About';
import { AboutMedia } from './hidden/features/about/collections/AboutMedia';
import { Cart } from './hidden/features/cart/collections/Cart';
import { Contacts } from './hidden/features/contacts/collections/Contacts';
import { Hero } from './hidden/features/hero/collections/Hero';
import { HeroMedia } from './hidden/features/hero/collections/HeroMedia';
import { ProductCategories } from './hidden/features/product-categories/collections/ProductCategories';
import { ProductCountries } from './hidden/features/product-countries/collections/ProductCountries';
import { Testimonials } from './hidden/features/testimonials/collections/Testimonials';
import { TestimonialsMedia } from './hidden/features/testimonials/collections/TestimonialsMedia';
import { ProductMedia, Products, ProductVariants } from './src/entities/products/model';
import { Seo } from './src/entities/seo/models';
import { SeoMedia } from './src/entities/seo/models/collections';
import { Users } from './src/entities/user/model';


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);


export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  blocks: [{
    slug: 'ColumnsBlock',
    fields: [
      {
        name: 'columns',
        type: 'array',
        required: true,
        defaultValue: [],
        fields: [
          {
            editor: lexicalEditor(),
            name: 'column',
            type: 'richText',
            required: true,
          },
        ],
      },
    ],
  }],
  globals: [
    About,
    Hero,
    Seo,
  ],
  collections: [
    Admins,
    SeoMedia,
    ProductCountries,
    Cart,
    Contacts,
    AboutMedia,
    Products,
    ProductMedia,
    ProductVariants,
    ProductCategories,
    HeroMedia,
    Testimonials,
    TestimonialsMedia,
    Users,
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures, rootFeatures }) => [
      ...rootFeatures,
      ...defaultFeatures,
      BlocksFeature({
        blocks: ['ColumnsBlock'],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    migrationDir: path.resolve('migrations'),
    client: {
      url: 'file:./database.db',
    },
  }),
  sharp,
  graphQL: {
    disable: true,
  },
  plugins: [],
});

